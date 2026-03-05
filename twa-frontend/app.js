// =============================================================================
// 1. CONFIGURACIÓN Y VARIABLES GLOBALES (TON INTEGRADO)
// =============================================================================
const adminTonWallet = "UQC_TU_BILLETERA_TON_AQUI_xX"; // Dirección TON del admin

let balance = parseFloat(localStorage.getItem('tcoin_balance')) || 0;
let usdtBalance = parseFloat(localStorage.getItem('usdt_balance')) || 0.0000;
let xp = parseInt(localStorage.getItem('user_xp')) || 0; // Ahora inicia en 0 real
let energy = parseInt(localStorage.getItem('user_energy')) || 2500;
let isVerified = localStorage.getItem('isVerified') === 'true'; // Estado de Activación
const maxEnergy = 2500;
const incomePerTouch = 4;

// Precarga de Audios
const tapSound = new Audio('../assets/sounds/tap.mp3');
const swapSound = new Audio('../assets/sounds/swap.mp3');
let volumeLevel = parseFloat(localStorage.getItem('sys_volume')) || 1.0;

// Inicializador TonConnect
let tonConnectUI;

// =============================================================================
// 2. INICIALIZACIÓN (TELEGRAM & UI)
// =============================================================================
window.onload = () => {
    // Configuración TonConnect SDK
    tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json', // Cambiar por tu URL de manifest
        buttonRootId: 'ton-connect'
    });

    updateUI();
    
    // Integración con Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand(); 
        
        // Obtener nombre real si está disponible
        if(tg.initDataUnsafe && tg.initDataUnsafe.user) {
            document.getElementById('display-username').innerText = tg.initDataUnsafe.user.first_name;
        }
        
        const startBtn = document.querySelector('#welcome-bot button');
        if(startBtn) {
            startBtn.addEventListener('click', () => {
                tg.HapticFeedback.impactOccurred('medium');
                document.getElementById('welcome-bot').style.display = 'none';
            });
        }
    } else {
        // Fallback navegador
        document.getElementById('welcome-bot').style.display = 'none';
    }
    
    setVolume(volumeLevel);
};

// =============================================================================
// 3. LÓGICA DE EVOLUCIÓN Y CLIC
// =============================================================================

function handleEvolution() {
    const robotImg = document.getElementById('robot-tap');
    if (!robotImg) return;

    let currentLevel = 1;
    if (xp >= 150000) currentLevel = 5;
    else if (xp >= 50000) currentLevel = 4;
    else if (xp >= 15000) currentLevel = 3;
    else if (xp >= 5000) currentLevel = 2;

    const currentSrc = robotImg.getAttribute('src');
    if (!currentSrc.includes(`robot${currentLevel}`)) {
        robotImg.src = `../assets/robot${currentLevel}.png`;
        robotImg.dataset.current = currentLevel;
    }
}

function handleRobotClick(e) {
    if (energy >= incomePerTouch) {
        balance += incomePerTouch;
        xp += 1; 
        energy -= incomePerTouch;
        
        tapSound.currentTime = 0;
        tapSound.play().catch(() => {});

        handleEvolution();
        updateUI();

        const floatingNum = document.createElement('div');
        floatingNum.innerText = `+${incomePerTouch}`;
        floatingNum.className = 'floating-num';
        floatingNum.style.left = `${e.clientX}px`;
        floatingNum.style.top = `${e.clientY}px`;
        document.body.appendChild(floatingNum);
        setTimeout(() => floatingNum.remove(), 800);
    } else {
        showRoboticModal("SIN ENERGÍA", "Espera a que los núcleos se recarguen.");
    }
}

// =============================================================================
// 4. SISTEMA DE MODALES Y FUNCIONES NUEVAS
// =============================================================================

function showRoboticModal(title, message, isInput = false, callback = null, customHTML = '') {
    const modal = document.createElement('div');
    modal.className = 'modal-robotic';
    
    let inputHTML = isInput ? `<input type="number" id="modal-input" placeholder="Cantidad..." style="width:100%; background: #000; border: 1px solid #00f2ff; color: #00f2ff; padding: 10px; margin: 10px 0; outline: none;">` : '';
    
    modal.innerHTML = `
        <h2>[ ${title} ]</h2>
        <p>${message}</p>
        ${inputHTML}
        ${customHTML}
        <div style="display:flex; gap:10px; justify-content:center; margin-top:15px;">
            <button id="modal-confirm" style="${!callback && !isInput && !customHTML ? 'display:none;' : ''}">ACEPTAR</button>
            <button id="modal-close">CERRAR</button>
        </div>
    `;
    
    document.body.appendChild(modal);

    document.getElementById('modal-close').onclick = () => modal.remove();
    const btnConfirm = document.getElementById('modal-confirm');
    if(btnConfirm) {
        btnConfirm.onclick = () => {
            if (callback) {
                const val = isInput ? document.getElementById('modal-input').value : true;
                callback(val);
            }
            modal.remove();
        };
    }
}

function openProfile() {
    const tgUser = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe.user) ? window.Telegram.WebApp.initDataUnsafe.user : { first_name: 'Piloto Local', id: Math.floor(Math.random() * 90000000) };
    showRoboticModal("PERFIL DE USUARIO", `<b>ID:</b> ${tgUser.id}<br><b>Rango Actual:</b> ${document.getElementById('robot-tap').dataset.current}/5<br><b>Estado:</b> ${isVerified ? 'VERIFICADO <i class="fas fa-check-circle"></i>' : 'NO VERIFICADO'}`);
}

function openSettings() {
    const html = `
        <div class="setting-row"><span>Idioma:</span> <select id="sys-lang"><option>Español</option><option>English</option></select></div>
        <div class="setting-row"><span>Volumen:</span> <input type="range" id="sys-vol" min="0" max="1" step="0.1" value="${volumeLevel}" onchange="setVolume(this.value)"></div>
        <button onclick="window.open('https://github.com/eibertt/mine-usdt-galaxy/blob/main/README.md')" style="width:100%; font-size:12px;">LEER POLÍTICA / README</button>
    `;
    showRoboticModal("AJUSTES DEL SISTEMA", "", false, null, html);
}

function setVolume(val) {
    volumeLevel = parseFloat(val);
    localStorage.setItem('sys_volume', volumeLevel);
    tapSound.volume = volumeLevel;
    swapSound.volume = volumeLevel;
}

function openRuleta() {
    showRoboticModal("RULETA T-COIN", "Apuesta T-Coins para multiplicar tus ganancias. Costo por giro: 5,000 T-C.", false, () => {
        if(balance >= 5000) {
            balance -= 5000;
            updateUI();
            showRoboticModal("GIRANDO...", "La ruleta está en movimiento...", false, null, "<i class='fas fa-dharmachakra fa-spin' style='font-size:40px; margin:20px 0;'></i>");
            setTimeout(() => { document.querySelector('.modal-robotic').remove(); showRoboticModal("RESULTADO", "¡Has ganado 100 de Energía!"); energy += 100; updateUI(); }, 2000);
        } else {
            showRoboticModal("ERROR", "No tienes suficientes T-Coins.");
        }
    });
}

function openAutoMiner() {
    showRoboticModal("AUTO-MINER BOT", "Activa el robot pasivo por 24 horas. Minará automáticamente mientras duermes. Costo: 0.5 TON.", false, () => {
        checkTONPayment(0.5, "Auto-Miner activado con éxito.");
    });
}

// =============================================================================
// 5. SISTEMA DE VERIFICACIÓN Y PAGOS TON
// =============================================================================

function verifyUser() {
    if(isVerified) {
        showRoboticModal("SISTEMA", "Tu cuenta ya se encuentra verificada en la Blockchain.");
        return;
    }
    showRoboticModal("ACTIVACIÓN REQUERIDA", "Para habilitar retiros y compras debes verificar tu cuenta enviando 0.1 TON a la red administrativa.", false, () => {
        checkTONPayment(0.1, "Cuenta verificada correctamente. Protocolos desbloqueados.", () => {
            isVerified = true;
            localStorage.setItem('isVerified', 'true');
        });
    });
}

function buyShip(shipNumber, priceTon) {
    if(!isVerified) {
        verifyUser();
        return;
    }
    showRoboticModal("COMPRA DE NAVE", `¿Autorizar transferencia de ${priceTon} TON para adquirir la Nave ${shipNumber}?`, false, () => {
        checkTONPayment(priceTon, `Nave ${shipNumber} adquirida y desplegada en la flota.`);
    });
}

// Función simulada de pago TON (hasta que configures el backend real de TonConnect Tx)
function checkTONPayment(amount, successMsg, callback = null) {
    if(!tonConnectUI.connected) {
        showRoboticModal("ERROR DE RED", "Debes conectar tu billetera TON (arriba) para procesar pagos.");
        return;
    }
    // Aquí iría la lógica real de tonConnectUI.sendTransaction(...)
    showRoboticModal("PROCESANDO PAGO", `Esperando confirmación de ${amount} TON en la red...`, false, null, "<i class='fas fa-circle-notch fa-spin' style='font-size:40px; margin:20px 0;'></i>");
    
    // Simulación de respuesta de Blockchain (3 segundos)
    setTimeout(() => {
        document.querySelector('.modal-robotic').remove();
        showRoboticModal("TRANSACCIÓN EXITOSA", successMsg);
        if(callback) callback();
    }, 3000);
}

// =============================================================================
// 6. FUNCIONES DE VISTA
// =============================================================================

function openSwap() {
    showRoboticModal("SWAP PROTOCOL", `Balance: ${balance} T-Coins. Rate: 100k = 1 USDT.`, true, (amount) => {
        amount = parseInt(amount);
        if (amount >= 100000 && amount <= balance) {
            let conversion = amount / 100000;
            balance -= amount;
            usdtBalance += conversion;
            swapSound.play();
            updateUI();
            showRoboticModal("SWAP COMPLETADO", `Recibido: ${conversion.toFixed(4)} USDT`);
        } else {
            showRoboticModal("ERROR", "Cantidad insuficiente o menor al mínimo (100k).");
        }
    });
}

function withdraw() {
    if(!isVerified) {
        verifyUser();
        return;
    }
    if (usdtBalance <= 0) {
        showRoboticModal("ERROR DE RETIRO", "No hay fondos en el depósito de USDT.");
        return;
    }
    showRoboticModal("SOLICITUD DE RETIRO", `Enviar ${usdtBalance.toFixed(4)} USDT a la billetera vinculada?`, false, () => {
        showRoboticModal("PROCESANDO", `Los fondos se enviarán a la red.`);
    });
}

// =============================================================================
// 7. UTILIDADES Y RECARGA
// =============================================================================

function updateUI() {
    localStorage.setItem('tcoin_balance', balance);
    localStorage.setItem('usdt_balance', usdtBalance);
    localStorage.setItem('user_energy', energy);
    localStorage.setItem('user_xp', xp);

    document.getElementById('main-balance').innerText = balance.toLocaleString('es-ES');
    
    // XP y Barra de Progreso a Cero
    const xpText = document.getElementById('xp-text');
    if(xpText) xpText.innerText = xp;
    
    const progressFill = document.getElementById('xp-progress');
    const rankMax = 5000; // Meta inicial
    if(progressFill) {
        let percent = (xp / rankMax) * 100;
        if(percent > 100) percent = 100;
        progressFill.style.width = `${percent}%`;
    }

    const energyDisplay = document.getElementById('energy-text');
    if(energyDisplay) energyDisplay.innerText = `${energy}/${maxEnergy}`;

    const walletUsdt = document.querySelector('.total-usdt-balance');
    if(walletUsdt) walletUsdt.innerHTML = `${usdtBalance.toFixed(4)} <span class="currency">USDT</span>`;
}

// Regeneración de energía
setInterval(() => {
    if (energy < maxEnergy) {
        energy += 1;
        updateUI();
    }
}, 1000);

function switchTab(tabId, clickedElement) {
    swapSound.currentTime = 0;
    swapSound.play().catch(() => {});
    
    document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    clickedElement.classList.add('active');
}

// [CÓDIGO DE SEGURIDAD O CIERRE]
console.log("Kernel Galaxia USDT v3.0 cargado con éxito.");
