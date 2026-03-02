const { Bot, InlineKeyboard } = require("grammy");

// Reemplaza 'TU_TOKEN_AQUI' con el token que te da @BotFather
const bot = new Bot("TU_TOKEN_AQUI");

bot.command("start", async (ctx) => {
  // Teclado con el botón para abrir la Mini App (TWA)
  const keyboard = new InlineKeyboard()
    .webApp("🚀 Jugar ahora", "https://tu-juego-url.com")
    .row()
    .url("📢 Canal Oficial", "https://t.me/tu_canal");

  await ctx.reply(
    `¡Bienvenido a Space Miners, Capitán ${ctx.from.first_name}! 🛰️\n\n` +
    "Prepara tus naves para extraer T-Coins y dominar la galaxia.\n" +
    "Haz clic en el botón de abajo para empezar a minar.",
    { reply_markup: keyboard }
  );
});

bot.start();
console.log("Bot de Space Miners ejecutándose...");
