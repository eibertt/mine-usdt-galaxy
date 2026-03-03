const { Bot, InlineKeyboard } = require("grammy");

// Aquí el bot leerá el token que configuraremos luego
const bot = new Bot(process.env.BOT_TOKEN);

// Comando /start: La bienvenida al imperio minero
bot.command("start", (ctx) => {
    const keyboard = new InlineKeyboard()
        .webApp("🚀 Jugar Ahora", "https://tu-enlace-aqui.com") // Aquí irá tu link del frontend
        .row()
        .url("📢 Canal Oficial", "https://t.me/TuCanal");

    ctx.reply(`¡Bienvenido al espacio, Capitán ${ctx.from.first_name}! 👨‍🚀\n\n` +
              "Prepárate para extraer USDT en la galaxia más lucrativa de Telegram.\n\n" +
              "Poder de minado actual: 0 T-Coins/h\n" +
              "Tu flota te espera.", { reply_markup: keyboard });
});

bot.start();
