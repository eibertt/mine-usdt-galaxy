// =============================================================================
// 1. CONFIGURACIÓN Y VARIABLES GLOBALES
// =============================================================================
const adminWallet = "TU_DIRECCION_USDT_AQUI"; // Dirección del administrador

let balance = parseFloat(localStorage.getItem('tcoin_balance')) || 0;
let usdtBalance = parseFloat(localStorage.getItem('usdt_balance')) || 0.0000;
let xp = parseInt(localStorage.getItem('user_xp')) || 0;
let energy = parseInt(localStorage.getItem('user_energy')) || 2500;
const maxEnergy = 2500;
const incomePerTouch = 4;

// Precarga de Audios
const tapSound = new Audio('../assets/sounds/tap.mp3');
const swapSound = new Audio('../assets/sounds/swap.mp3');

// =============================================================================
// 2. INICIALIZACIÓN (TELEGRAM & UI)
// =============================================================================
window.onload = () => {
    updateUI();
    
    // Integración con Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand(); // Expandir la app a pantalla completa
        
        // Vincular el botón de inicio de tu HTML previo
        const startBtn = document.querySelector('#welcome-bot button');
        if(startBtn) {
            startBtn.addEventListener('click', () => {
                tg.HapticFeedback.impactOccurred('medium');
                document.getElementById('welcome-bot').style.display = 'none';
            });
        }
    }
};

// =============================================================================
// 3. LÓGICA DE EVOLUCIÓN Y CLIC
// =============================================================================

function handleEvolution() {
    const robotImg = document.getElementById('robot-tap');
    if (!robotImg) return;

    // Lógica de niveles por XP (Ejemplo: cada 5000 XP sube de nivel)
    let currentLevel = 1;
    if (xp >= 20000) currentLevel = 5;
    else if (xp >= 15000) currentLevel = 4;
    else if (xp >= 10000) currentLevel = 3;
    else if (xp >= 5000) currentLevel = 2;

    robotImg.src = `../assets/robot${currentLevel}.png`;
    robotImg.dataset.current = currentLevel;
}

function handleRobotClick(e) {
    if (energy >= incomePerTouch) {
        balance += incomePerTouch;
        xp += 1; // El XP aumenta con cada toque
        energy -= incomePerTouch;
        
        // Efecto de sonido
        tapSound.currentTime = 0;
        tapSound.play().catch(() => {}); // Catch para evitar errores si no hay interacción previa

        handleEvolution();
        updateUI();

        // Número flotante (Visual)
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
// 4. SISTEMA DE MODALES ROBÓTICOS (REEMPLAZA PROMPTS)
// =============================================================================

function showRoboticModal(title, message, isInput = false, callback = null) {
    const modal = document.createElement('div');
    modal.className = 'modal-robotic';
    
    let inputHTML = isInput ? `<input type="number" id="modal-input" placeholder="Cantidad..." style="width:100%; background: #000; border: 1px solid #00f2ff; color: #00f2ff; padding: 10px; margin: 10px 0; outline: none;">` : '';
    
    modal.innerHTML = `
        <h2>[ ${title} ]</h2>
        <p>${message}</p>
        ${inputHTML}
        <div style="display:flex; gap:10px; justify-content:center;">
            <button id="modal-confirm">ACEPTAR</button>
            <button id="modal-close">CANCELAR</button>
        </div>
    `;
    
    document.body.appendChild(modal);

    document.getElementById('modal-close').onclick = () => modal.remove();
    document.getElementById('modal-confirm').onclick = () => {
        if (callback) {
            const val = isInput ? document.getElementById('modal-input').value : true;
            callback(val);
        }
        modal.remove();
    };
}

// =============================================================================
// 5. FUNCIONES DE VISTA (MODIFICADAS)
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

function openSettings() {
    showRoboticModal("CONFIGURACIÓN", "ID de Usuario: " + (Math.random() * 1000000).toFixed(0) + "\nVersión del Kernel: 2.0.6-G");
}

function withdraw() {
    if (usdtBalance <= 0) {
        showRoboticModal("ERROR DE RETIRO", "No hay fondos en el depósito de USDT.");
        return;
    }
    showRoboticModal("SOLICITUD DE RETIRO", `Enviar ${usdtBalance.toFixed(4)} USDT a la red externa?`, false, () => {
        showRoboticModal("PROCESANDO", `Los fondos se enviarán a la red de minería.`);
    });
}

// =============================================================================
// 6. UTILIDADES Y RECARGA
// =============================================================================

function updateUI() {
    localStorage.setItem('tcoin_balance', balance);
    localStorage.setItem('usdt_balance', usdtBalance);
    localStorage.setItem('user_energy', energy);
    localStorage.setItem('user_xp', xp);

    document.getElementById('main-balance').innerText = balance.toLocaleString('es-ES');
    
    // Actualizar XP en el contenedor creado en el HTML
    const xpDisplay = document.querySelector('.xp-container');
    if(xpDisplay) xpDisplay.innerHTML = `<i class="fas fa-star" style="color: gold;"></i> XP: ${xp}`;

    const energyDisplay = document.getElementById('energy-text');
    if(energyDisplay) energyDisplay.innerText = `${energy}/${maxEnergy}`;

    // Actualizar balances USDT
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
console.log("Kernel Galaxia USDT cargado con éxito.");
