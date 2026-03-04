// VARIABLES DE ESTADO (EL "CEREBRO" DEL JUEGO)
let balance = 51342;
let energy = 2500;
let maxEnergy = 2500;
let incomePerTouch = 4;
let incomePerHour = 5590;
let userUSDT = 0.0473;

// 1. CAMBIO DE PESTAÑAS
function switchTab(tabId, btn) {
    document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

// 2. CLIC EN EL ROBOT
function handleRobotClick(e) {
    if (energy >= incomePerTouch) {
        // Actualizar datos
        balance += incomePerTouch;
        energy -= incomePerTouch;
        updateUI();

        // Crear número flotante (+4)
        const num = document.createElement('div');
        num.innerText = `+${incomePerTouch}`;
        num.className = 'floating-num';
        num.style.left = `${e.clientX}px`;
        num.style.top = `${e.clientY}px`;
        document.body.appendChild(num);

        setTimeout(() => num.remove(), 700);
    } else {
        alert("¡Energía agotada socio! Espera a que recargue.");
    }
}

// 3. ACTUALIZAR LA PANTALLA
function updateUI() {
    document.getElementById('main-balance').innerText = Math.floor(balance).toLocaleString();
    const energyDisplay = document.querySelector('.stat-card:nth-child(3) .stat-value');
    energyDisplay.innerHTML = `<i class="fas fa-bolt" style="color: #ffd700;"></i> ${energy}/${maxEnergy}`;
    
    // Actualizar barra de progreso de energía (opcional)
    const energyPercent = (energy / maxEnergy) * 100;
    document.querySelector('.progress-fill').style.width = `${energyPercent}%`;
}

// 4. LÓGICA DE COMPRA DE NAVES
function buyShip(shipId, price) {
    if (userUSDT >= price) {
        userUSDT -= price;
        alert(`¡Felicidades! Compraste la Nave ${shipId}`);
        // Cambiar imagen de nave activa
        document.querySelector('.active-ship-img').src = `../assets/nave${shipId}.png`;
        updateUI();
    } else {
        alert("No tienes suficiente USDT, socio.");
    }
}

// 5. FUNCIONES DE BOTONES
function openProfile() { alert("Perfil de Eiber't Torres"); }
function openSettings() { alert("Ajustes del Sistema Galáctico"); }
function openSwap() {
    let tcoinsToSwap = prompt("¿Cuántos T-Coins quieres cambiar a USDT?");
    if (tcoinsToSwap && balance >= tcoinsToSwap) {
        let converted = tcoinsToSwap / 100000; // Ejemplo de tasa
        balance -= tcoinsToSwap;
        userUSDT += converted;
        updateUI();
        alert(`Cambio exitoso: Recibiste ${converted.toFixed(4)} USDT`);
    }
}

// 6. RECUPERACIÓN DE ENERGÍA AUTOMÁTICA
setInterval(() => {
    if (energy < maxEnergy) {
        energy += 1;
        updateUI();
    }
}, 1000); // Recupera 1 punto de energía por segundo
