// casino.js - Juegos de Azar
function spinBottle() {
    const cost = 500; // Costo por giro
    window.Telegram.WebApp.showConfirm(`¿Quieres girar la ruleta por ${cost} T-Coins?`, (ok) => {
        if(ok) {
            const prizes = [0, 100, 500, 1000, 5000];
            const result = prizes[Math.floor(Math.random() * prizes.length)];
            window.Telegram.WebApp.showAlert(`¡La ruleta se detuvo! Ganaste: ${result} T-Coins`);
        }
    });
}
