// referrals.js - Sistema de Invitación y Tareas
const INVITE_BONUS = 5000; // Lo que gana el usuario por invitar

function copyInviteLink() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const inviteLink = `https://t.me/TCoinClickerBot?start=${userId}`; // Tu bot
    
    navigator.clipboard.writeText(inviteLink);
    window.Telegram.WebApp.showAlert("¡Enlace de invitación copiado! Envíalo a tus amigos galácticos.");
}

function checkTask(taskId) {
    // Aquí validaremos si el usuario se unió al canal o siguió la cuenta
    window.Telegram.WebApp.showAlert("Verificando tarea... ¡Recuerda seguir a Portal TecnoHoy!");
}
