// app.js - Lógica de Evolución y Clicks

let coins = 0;
let xp = 0;
let level = 1;

// Configuración de niveles (Clicks necesarios para evolucionar)
const levels = {
    1: { minXP: 0, img: 'robot1.png' },
    2: { minXP: 100, img: 'robot2.png' },
    3: { minXP: 500, img: 'robot3.png' },
    4: { minXP: 2000, img: 'robot4.png' },
    5: { minXP: 5000, img: 'robot5.png' } // El Dorado
};

function handleTap(event) {
    // 1. Sumar monedas y XP
    coins += 1;
    xp += 10; 
    
    // 2. Actualizar UI
    document.getElementById('bal').innerText = coins.toLocaleString();
    
    // 3. Verificar Evolución
    checkEvolution();
    
    // 4. Feedback Visual (Vibración de Telegram)
    if (window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }

    // 5. Animación de "Moneda flotante" (Opcional)
    createFloatingText(event);
}

function checkEvolution() {
    let newLevel = level;
    
    if (xp >= levels[5].minXP) newLevel = 5;
    else if (xp >= levels[4].minXP) newLevel = 4;
    else if (xp >= levels[3].minXP) newLevel = 3;
    else if (xp >= levels[2].minXP) newLevel = 2;

    if (newLevel !== level) {
        level = newLevel;
        evolveAnimation();
    }
}

function evolveAnimation() {
    const robotImg = document.getElementById('main-robot');
    
    // Cambiamos la imagen
    robotImg.src = `assets/${levels[level].img}`;
    
    // Mensaje de Telegram
    window.Telegram.WebApp.showAlert(`¡Increíble! Tu robot ha evolucionado al Nivel ${level}`);
}

// Función extra para que salgan numeritos al cliquear
function createFloatingText(e) {
    const float = document.createElement('div');
    float.innerText = "+1";
    float.className = "floating-number";
    float.style.left = `${e.pageX}px`;
    float.style.top = `${e.pageY}px`;
    document.body.appendChild(float);
    
    setTimeout(() => float.remove(), 800);
}
