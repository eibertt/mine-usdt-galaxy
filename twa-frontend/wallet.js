// wallet.js - El motor financiero de Space Miners

// Tasas de cambio
const TCOIN_TO_USDT_RATE = 10000;

// Función para actualizar los balances visualmente
function updateWalletUI(balances) {
    document.getElementById('wallet-tcoin').innerText = balances.tcoin.toFixed(2);
    document.getElementById('wallet-usdt').innerText = balances.usdt.toFixed(4);
    document.getElementById('wallet-ton').innerText = balances.ton.toFixed(4);
    
    // Calcular el valor aproximado en USDT para la etiqueta pequeña
    const approxUSDT = balances.tcoin / TCOIN_TO_USDT_RATE;
    document.querySelector('.asset-balance small').innerText = `≈ $${approxUSDT.toFixed(2)} USDT`;
}

// Lógica del Swap (Cálculo en tiempo real)
function calcSwap() {
    const fromInput = document.getElementById('swap-from-val');
    const toInput = document.getElementById('swap-to-val');
    
    const amount = parseFloat(fromInput.value);
    if (!isNaN(amount) && amount > 0) {
        toInput.value = (amount / TCOIN_TO_USDT_RATE).toFixed(4);
    } else {
        toInput.value = "";
    }
}

// Ejecutar el intercambio
function executeSwap() {
    const amount = parseFloat(document.getElementById('swap-from-val').value);
    
    if (isNaN(amount) || amount < 1000) {
        window.Telegram.WebApp.showAlert("Socio, el mínimo para cambiar son 1,000 T-Coins.");
        return;
    }

    // Aquí conectarás con tu base de datos en el futuro
    window.Telegram.WebApp.showConfirm(`¿Confirmas el cambio de ${amount} T-Coins?`, (confirmed) => {
        if (confirmed) {
            // Lógica de éxito
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
            window.Telegram.WebApp.showAlert("¡Intercambio procesado con éxito, capitán!");
        }
    });
}
