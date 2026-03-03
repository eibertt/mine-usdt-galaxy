// referrals.js - Lógica de Crecimiento Galáctico

const REFERRAL_CONFIG = {
    guest_bonus: 1000,    // Bono para el que entra
    host_bonus: 2500,     // Bono para el que invita
    mining_commission: 0.10 // 10% de comisión
};

// Generar el link único con el ID de Telegram del usuario
function getInviteLink() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    return `https://t.me/TCoinClickerBot?start=${userId}`;
}

// Función para copiar al portapapeles
function shareLink() {
    const link = getInviteLink();
    navigator.clipboard.writeText(link).then(() => {
        window.Telegram.WebApp.showAlert("🚀 ¡Enlace copiado! Compártelo para ganar 2,500 T-Coins por cada amigo.");
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    });
}

// Lógica de Tareas (Misiones)
const tasks = [
    { id: 1, desc: "Unirse al canal Portal TecnoHoy", reward: 5000 },
    { id: 2, desc: "Seguir en X (Twitter)", reward: 3000 },
    { id: 3, desc: "Invitar a 5 amigos", reward: 15000 }
];

function claimTaskReward(taskId) {
    const task = tasks.find(t => t.id === taskId);
    // Aquí se conectaría con el bot para verificar la acción
    window.Telegram.WebApp.showConfirm(`¿Has completado la tarea: ${task.desc}?`, (confirmed) => {
        if(confirmed) {
            window.Telegram.WebApp.showAlert(`¡Revisando! Si es correcto, recibirás ${task.reward} T-Coins.`);
        }
    });
}
