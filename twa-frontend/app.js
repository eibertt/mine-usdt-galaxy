// Función intacta para cambiar entre pestañas sin recargar la página
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
     // Función para el robot
function handleRobotClick(event) {
    const robot = event.target;
    
    // 1. Lógica de balance (asumiendo que tienes variables para esto)
    // balance += 4;
    // updateUI();

    // 2. Crear número flotante
    const floatingNum = document.createElement('div');
    floatingNum.innerHTML = '+4';
    floatingNum.className = 'floating-number';
    
    // Posicionar donde se hizo el clic
    floatingNum.style.left = `${event.clientX}px`;
    floatingNum.style.top = `${event.clientY}px`;
    
    document.body.appendChild(floatingNum);
    
    // Eliminar después de la animación
    setTimeout(() => {
        floatingNum.remove();
    }, 800);
}

// Funciones para botones de cabecera
function openProfile() {
    alert("Abriendo perfil de Eiber't Torres...");
}

function openSettings() {
    alert("Configuraciones del juego...");
}

// Función para comprar naves
function buyShip(shipId, price) {
    console.log(`Intentando comprar nave ${shipId} por ${price} USDT`);
    // Aquí iría la lógica de verificar saldo y actualizar la nave principal
}
