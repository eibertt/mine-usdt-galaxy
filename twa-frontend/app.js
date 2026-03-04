// =============================================================================
// 1. FUNCIÓN DE PESTAÑAS ORIGINAL
// =============================================================================
function switchTab(tabId, clickedElement) {
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => {
        view.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.nav-item');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    clickedElement.classList.add('active');
}

// =============================================================================
// 2. LÓGICA DEL JUEGO Y MEMORIA LOCAL (ARRANCA EN CERO)
// =============================================================================

// Cargamos de la memoria o iniciamos en 0
let balance = parseFloat(localStorage.getItem('tcoin_balance')) || 0;
let usdtBalance = parseFloat(localStorage.getItem('usdt_balance')) || 0.0000;
let energy = parseInt(localStorage.getItem('user_energy')) || 2500;
let maxEnergy = 2500;
let incomePerTouch = 4;

// Al cargar la página, se muestran los datos guardados
window.onload = () => {
    updateUI();
};

// --- FUNCIÓN PARA EL CLIC DEL ROBOT ---
function handleRobotClick(e) {
    if (energy >= incomePerTouch) {
        balance += incomePerTouch;
        energy -= incomePerTouch;
        
        updateUI();

        // Número flotante
        const floatingNum = document.createElement('div');
        floatingNum.innerText = `+${incomePerTouch}`;
        floatingNum.className = 'floating-num';
        floatingNum.style.left = `${e.clientX}px`;
        floatingNum.style.top = `${e.clientY}px`;
        
        document.body.appendChild(floatingNum);
        setTimeout(() => floatingNum.remove(), 800);
    } else {
        // Opcional: vibrar o avisar que no hay energía
        console.log("Sin energía suficiente");
    }
}

// --- ACTUALIZACIÓN DE LA INTERFAZ Y GUARDADO AUTOMÁTICO ---
function updateUI() {
    // 1. Guardar en la memoria del teléfono
    localStorage.setItem('tcoin_balance', balance);
    localStorage.setItem('usdt_balance', usdtBalance);
    localStorage.setItem('user_energy', energy);

    // 2. Actualizar balance principal T-Coin
    const balanceElement = document.getElementById('main-balance');
    if(balanceElement) balanceElement.innerText = balance.toLocaleString('es-ES');

    // 3. Actualizar balances T-Coin en otras vistas (Wallet y Accelerate)
    const assetTcoin = document.getElementById('asset-tcoin');
    const accelTcoin = document.getElementById('accel-tcoin');
    if(assetTcoin) assetTcoin.innerText = balance.toLocaleString('es-ES');
    if(accelTcoin) accelTcoin.innerText = balance.toLocaleString('es-ES');

    // 4. Actualizar balances USDT en todas partes
    const walletUsdt = document.querySelector('.total-usdt-balance');
    const assetUsdt = document.getElementById('asset-usdt');
    const accelUsdt = document.getElementById('accel-usdt');
    
    if(walletUsdt) walletUsdt.innerHTML = `${usdtBalance.toFixed(4)} <span class="currency">USDT</span>`;
    if(assetUsdt) assetUsdt.innerText = usdtBalance.toFixed(4);
    if(accelUsdt) accelUsdt.innerText = usdtBalance.toFixed(4);

    // 5. Actualizar texto de energía
    const energyDisplay = document.getElementById('energy-text');
    if(energyDisplay) {
        energyDisplay.innerText = `${energy}/${maxEnergy}`;
    }
}

// --- RECUPERACIÓN AUTOMÁTICA DE ENERGÍA ---
setInterval(() => {
    if (energy < maxEnergy) {
        energy += 1;
        updateUI(); // Esto actualizará la barra visualmente y guardará
    }
}, 1000); // 1 punto por segundo

// --- FUNCIONES EXTRA ---
function openProfile() {
    alert("Abriendo perfil...");
}

function openSettings() {
    alert("Abriendo ajustes...");
}

function openSwap() {
    let amount = prompt(`Tienes ${balance} T-Coins.\n¿Cuántos deseas cambiar a USDT? (100,000 T-Coins = 1 USDT)`);
    if (amount) {
        amount = parseInt(amount);
        if (amount > 0 && amount <= balance) {
            let conversion = amount / 100000; 
            balance -= amount;
            usdtBalance += conversion;
            alert(`¡Swap exitoso! Has recibido ${conversion.toFixed(4)} USDT`);
            updateUI();
        } else {
            alert("Cantidad inválida o no tienes suficientes T-Coins.");
        }
    }
}

function recharge() {
    alert("Función de depósito en mantenimiento.");
}

function withdraw() {
    if (usdtBalance > 0) {
        alert("Retirando " + usdtBalance.toFixed(4) + " USDT a tu billetera...");
    } else {
        alert("No tienes USDT para retirar.");
    }
}

// --- COMPRA DE NAVES ---
function buyShip(shipNumber, price) {
    if (usdtBalance >= price) {
        usdtBalance -= price;
        alert(`¡Nave ${shipNumber} comprada con éxito por ${price} USDT!`);
        
        // Cambiar la imagen de la nave principal
        const mainShipImg = document.querySelector('.active-ship-img');
        if(mainShipImg) mainShipImg.src = `../assets/nave${shipNumber}.png`;
        
        updateUI();
    } else {
        alert(`Saldo insuficiente. Necesitas ${price} USDT para esta nave.`);
    }
}

function processBuy() {
    alert("Función de compra rápida activada.");
}
