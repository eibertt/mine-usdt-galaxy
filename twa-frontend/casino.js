// casino.js - El Centro de Entretenimiento de Space Miners

const CASINO_SETTINGS = {
    min_bet: 500,
    max_bet: 100000,
    house_edge: 0.05 // 5% de ventaja para ti (la casa siempre gana)
};

// 1. DADOS ESPACIALES (MAYOR/MENOR)
function playSpaceDice(userBet, choice) {
    if (userBet < CASINO_SETTINGS.min_bet) {
        window.Telegram.WebApp.showAlert("Socio, la apuesta mínima son 500 T-Coins.");
        return;
    }

    // Generamos un número del 1 al 100
    // Ajustamos la probabilidad para que el usuario tenga un 47% de ganar (no 50%)
    const result = Math.floor(Math.random() * 100) + 1;
    let win = false;

    if (choice === 'high' && result > 53) win = true; // Gana si sale > 53
    if (choice === 'low' && result < 48) win = true;  // Gana si sale < 48

    processResult(win, userBet, "Dados");
}

// 2. RULETA DE LA SUERTE (Giro Visual)
function spinGalacticWheel() {
    window.Telegram.WebApp.showConfirm("¿Girar la Ruleta por 1,000 T-Coins?", (confirmed) => {
        if (confirmed) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
            
            // Lógica de premios con "trampa" (el 60% de las veces cae en premios pequeños o nada)
            const random = Math.random();
            let prize = "0";
            
            if (random < 0.40) prize = "0 T-Coins (Casi!)";
            else if (random < 0.80) prize = "200 T-Coins";
            else if (random < 0.95) prize = "2,000 T-Coins";
            else prize = "¡10,000 T-Coins! (JACKPOT)";

            window.Telegram.WebApp.showAlert(`🚀 La ruleta se detuvo en: ${prize}`);
        }
    });
}

function processResult(win, bet, game) {
    if (win) {
        const payout = bet * 2;
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        window.Telegram.WebApp.showAlert(`¡GANASTE! Recibes ${payout} T-Coins.`);
    } else {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        window.Telegram.WebApp.showAlert(`Suerte para la próxima, socio. Perdiste ${bet} T-Coins.`);
    }
}
