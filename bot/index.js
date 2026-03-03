// bot/index.js - El Portero de Space Miners
const { Telegraf, Markup } = require('telegraf');

// SUSTITUYE ESTO POR TU TOKEN DE BOTFATHER
const bot = new Telegraf('TU_TOKEN_AQUI');

// URL DE TU PROYECTO (Donde lo tengas alojado, ej: Vercel)
const GAME_URL = "https://tu-proyecto.vercel.app";

// 1. COMANDO /START
bot.start((ctx) => {
    const name = ctx.from.first_name;
    
    ctx.replyWithMarkdownV2(
        `🚀 *¡Bienvenido a la Galaxia, ${name}\!* 🚀\n\n` +
        `Minería USDT, naves espaciales y premios te esperan\.`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🛰️ INICIAR JUEGO', GAME_URL)],
            [Markup.button.url('🌐 Portal TecnoHoy', 'https://portaltecnohoy.com')]
        ])
    );
});

// 2. COMANDO PARA RECOGER RECOMPENSAS DIARIAS (Opcional)
bot.command('bonus', (ctx) => {
    ctx.reply("¡Recuerda entrar al juego para reclamar tus T-Coins diarios!");
});

// Lanzar el bot
bot.launch();
console.log("🛰️ Bot de Space Miners en órbita...");

// Habilitar parada suave
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
