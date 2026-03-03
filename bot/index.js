const { Bot, InlineKeyboard } = require("grammy");
require("dotenv").config();

// El bot usa el token que configuraste en Render
const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", async (ctx) => {
    // Enlace a tu juego en GitHub Pages
    const gameUrl = "https://eibertt.github.io/mine-usdt-galaxy/twa-frontend/index.html";

    
    const keyboard = new InlineKeyboard()
        .webApp("🚀 ¡EMPEZAR A MINAR!", gameUrl)
        .row()
        .url("📢 Canal de la Galaxia", "https://t.me/TuCanalOficial")
        .url("👨‍💻 Soporte", "https://t.me/TuUsuario");

    await ctx.replyWithPhoto("https://raw.githubusercontent.com/eibertt/mine-usdt-galaxy/main/assets/nodriza_estelar.png", {
        caption: `<b>¡BIENVENIDO CAPITÁN ${ctx.from.first_name.toUpperCase()}!</b> 👨‍🚀🌌\n\n` +
                 "Has sido asignado a la flota de <b>Space Miners</b>. Tu misión es simple: extraer la mayor cantidad de USDT de la galaxia.\n\n" +
                 "🛸 <b>Estado de Flota:</b> Activa\n" +
                 "💰 <b>Balance:</b> 0.00 T-Coins\n" +
                 "⛏️ <b>Poder:</b> Reclama tu primera nave gratis.\n\n" +
                 "<i>Toca el botón de abajo para entrar a la cabina de mando.</i>",
        parse_mode: "HTML",
        reply_markup: keyboard
    });
});

bot.start();
console.log("🚀 Bot de Space Miners encendido en el espacio profundo...");
