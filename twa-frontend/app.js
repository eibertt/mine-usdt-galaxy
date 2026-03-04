// Función para cambiar entre pestañas
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

    // 3. Mostramos la vista correspondiente al botón clickeado
    document.getElementById(tabId).classList.add('active');

    // 4. Activamos visualmente el botón que el usuario clickeó
    clickedElement.classList.add('active');
}
