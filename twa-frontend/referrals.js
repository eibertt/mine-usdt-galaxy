// tasks.js - Misiones, Anuncios y Referidos

const USER_TASKS = [
    { 
        id: "invite_5", 
        title: "Recluta Galáctico", 
        desc: "Invita a 5 amigos al bot", 
        reward: 15000, 
        type: "referral" 
    },
    { 
        id: "ad_1", 
        title: "Ver Anuncio", 
        desc: "Mira un video para ganar T-Coins", 
        reward: 500, 
        type: "ad",
        link: "https://t.me/TuOtroBot" // Aquí colocarás el enlace al otro bot
    },
    { 
        id: "blog_visit", 
        title: "Explorar Portal TecnoHoy", 
        desc: "Lee nuestra última noticia tecnológica", 
        reward: 1000, 
        type: "link",
        link: "https://portaltecnohoy.com"
    }
];

// Función para abrir enlaces de anuncios o bots
function openTaskLink(taskId) {
    const task = USER_TASKS.find(t => t.id === taskId);
    
    if (task.link) {
        // Abrimos el enlace externo o el otro bot
        window.Telegram.WebApp.openLink(task.link);
        
        // Notificamos que debe completar la acción
        setTimeout(() => {
            window.Telegram.WebApp.showConfirm(`¿Completaste la tarea: ${task.title}?`, (ok) => {
                if(ok) {
                    window.Telegram.WebApp.showAlert(`¡Revisando! Recibirás ${task.reward} T-Coins pronto.`);
                }
            });
        }, 2000);
    }
}

// Función para copiar el link de referido (lo que hablamos de los cálculos)
function copyMyReferralLink() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const link = `https://t.me/TCoinClickerBot?start=${userId}`;
    
    navigator.clipboard.writeText(link);
    window.Telegram.WebApp.showAlert("¡Link de invitación copiado! Gana por cada amigo que se una.");
}
