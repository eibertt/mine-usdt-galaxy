// auth.js - Conexión con Telegram
const user = window.Telegram.WebApp.initDataUnsafe.user;

function loadUserData() {
    if (user) {
        console.log(`Bienvenido Capitán: ${user.first_name}`);
        // Aquí cargaremos el balance desde tu base de datos en el futuro
    } else {
        console.error("No se detectó usuario de Telegram.");
    }
}
