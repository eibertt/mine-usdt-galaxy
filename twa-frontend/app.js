// Inicializar la Web App de Telegram
const tg = window.Telegram.WebApp;
tg.expand(); // Abre el juego en pantalla completa

let balance = 0;
let fuel = 100;

// Mostrar el nombre del usuario de Telegram
document.getElementById('username').innerText = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.first_name : "Minero";

function mineClick() {
    if (fuel > 0) {
        // Lógica básica de minería (basado en la Sonda Nano: 0.5 T-Coins/h)
        // Por ahora lo hacemos por click para probar
        balance += 0.01; 
        fuel -= 1;
        
        updateUI();
    } else {
        alert("¡Sin combustible! Espera a que se recargue.");
    }
}

function updateUI() {
    document.getElementById('balance').innerText = balance.toFixed(2);
    document.getElementById('fuel-bar').style.width = fuel + "%";
}
