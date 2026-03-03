// auth.js - Identificación y Persistencia del Capitán

// 1. Inicializamos la WebApp de Telegram
const tg = window.Telegram.WebApp;

// 2. Extraemos los datos del usuario
const userData = tg.initDataUnsafe.user;

// Objeto global para el estado del jugador
let player = {
    id: userData ? userData.id : "000000",
    name: userData ? userData.first_name : "Explorador",
    username: userData ? userData.username : "Desconocido",
    coins: 0,
    xp: 0,
    level: 1,
    last_login: new Date().toISOString()
};

// 3. Función para dar la bienvenida
function initAuth() {
    // Expandimos la app para que ocupe toda la pantalla
    tg.expand();

    // Cambiamos el color de la cabecera al azul de tu marca
    tg.setHeaderColor('#0b0c10');

    console.log(`🚀 Sesión iniciada para: ${player.name} (ID: ${player.id})`);

    // Actualizamos el nombre en la interfaz si existe el elemento
    const nameLabel = document.getElementById('user-name');
    if (nameLabel) nameLabel.innerText = player.name;

    // Notificamos a Telegram que la app está lista
    tg.ready();
}

// 4. Lógica de Guardado (Simulación para el futuro Backend)
function saveProgress() {
    // Aquí es donde en el futuro enviaremos los datos a tu base de datos
    // Por ahora, lo guardamos en el navegador del usuario (LocalStorage)
    localStorage.setItem('space_miners_data', JSON.stringify(player));
    console.log("💾 Progreso guardado en la nube galáctica.");
}

// Ejecutamos la autenticación al cargar el script
initAuth();
