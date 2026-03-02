/**
 * 🏛️ Space Miners Vault Logic
 * Define las reglas de retiro y comisiones del ecosistema.
 */

const VAULT_CONFIG = {
    min_withdrawal_usdt: 10.00, // Mínimo para retirar a Binance/Wallet [cite: 2026-03-01]
    withdrawal_fee_percent: 5,   // Comisión de mantenimiento del 5% [cite: 2026-03-01]
    tcoin_to_usdt_rate: 100,     // Ejemplo: 100 T-Coins = 1 USDT [cite: 2026-03-01]
    max_daily_withdrawals: 1     // Límite de 1 retiro por día por seguridad [cite: 2026-03-01]
};

function calculateNetWithdrawal(amountTCoins) {
    const amountUSDT = amountTCoins / VAULT_CONFIG.tcoin_to_usdt_rate; [cite: 2026-03-01]
    const fee = (amountUSDT * VAULT_CONFIG.withdrawal_fee_percent) / 100; [cite: 2026-03-01]
    
    return {
        gross: amountUSDT.toFixed(2),
        fee: fee.toFixed(2),
        net: (amountUSDT - fee).toFixed(2)
    };
}

module.exports = { VAULT_CONFIG, calculateNetWithdrawal };
