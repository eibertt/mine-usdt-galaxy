// =============================================================================
// 1. TU FUNCIÓN ORIGINAL (INTACTA)
// =============================================================================
function switchTab(tabId, clickedElement) {
    // 1. Ocultamos todas las vistas
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => {
        view.classList.remove('active');
    });

    // 2. Le quitamos el estado "activo" a todos los botones del menú
    const buttons = document.querySelectorAll('.nav-item');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Mostramos la vista correspondiente
    document.getElementById(tabId).classList.add('active');

    // 4. Activamos visualmente el botón
    clickedElement.classList.add('active');
}

// =============================================================================
// 2. NUEVAS FUNCIONES INYECTADAS (LÓGICA DEL JUEGO)
// =============================================================================

// Variables de estado iniciales
let balance = 51342;
let energy = 2500;
let maxEnergy = 2500;
let incomePerTouch = 4;

// --- FUNCIÓN PARA EL CLIC DEL ROBOT ---
function handleRobotClick(e) {
    if (energy >= incomePerTouch) {
        // Actualizar balance y energía
        balance += incomePerTouch;
        energy -= incomePerTouch;
        
        updateUI();

        // Crear el número flotante (+4)
        const floatingNum = document.createElement('div');
        floatingNum.innerText = `+${incomePerTouch}`;
        floatingNum.className = 'floating-num';
        
        // Posicionamiento exacto en el clic
        floatingNum.style.left = `${e.clientX}px`;
        floatingNum.style.top = `${e.clientY}px`;
        
        document.body.appendChild(floatingNum);

        // Limpiar el elemento después de la animación
        setTimeout(() => {
            floatingNum.remove();
        }, 800);
    }
}

// --- ACTUALIZACIÓN DE LA INTERFAZ ---
function updateUI() {
    // Actualizar balance principal
    const balanceElement = document.getElementById('main-balance');
    if(balanceElement) balanceElement.innerText = balance.toLocaleString();

    // Actualizar texto de energía (2500/2500)
    const energyDisplay = document.querySelector('.stat-card:nth-child(3) .stat-value');
    if(energyDisplay) {
        energyDisplay.innerHTML = `<i class="fas fa-bolt" style="color: #ffd700;"></i> ${energy}/${maxEnergy}`;
    }
}

// --- RECUPERACIÓN AUTOMÁTICA DE ENERGÍA ---
setInterval(() => {
    if (energy < maxEnergy) {
        energy += 1;
        updateUI();
    }
}, 1000); // Recupera 1 punto cada segundo

// --- FUNCIONES DE LOS BOTONES DE LAS ESQUINAS ---
function openProfile() {
    alert("Abriendo perfil de Eiber't Torres...");
}

function openSettings() {
    alert("Abriendo ajustes del sistema...");
}

// --- FUNCIÓN DE LA WALLET (SWAP) ---
function openSwap() {
    let amount = prompt("¿Cuántos T-Coins deseas cambiar a USDT?");
    if (amount) {
        amount = parseInt(amount);
        if (amount <= balance) {
            let conversion = amount / 100000; // Ejemplo: 100k T-Coins = 1 USDT
            balance -= amount;
            alert(`¡Swap exitoso! Has recibido ${conversion.toFixed(4)} USDT`);
            updateUI();
        } else {
            alert("No tienes suficientes T-Coins, socio.");
        }
    }
}

// --- FUNCIÓN PARA COMPRAR NAVES ---
function buyShip(shipNumber, price) {
    // Aquí podrías añadir lógica para descontar USDT
    alert(`Has seleccionado la Nave ${shipNumber}. Costo: ${price} USDT.`);
    // Cambia la imagen de la nave activa en el Accelerate view
    const mainShipImg = document.querySelector('.active-ship-img');
    if(mainShipImg) mainShipImg.src = `../assets/nave${shipNumber}.png`;
}
