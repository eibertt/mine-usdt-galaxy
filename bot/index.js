const { Bot, InlineKeyboard } = require("grammy");
require("dotenv").config();

// Iniciamos el bot con el Token del archivo .env
const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  const keyboard = new InlineKeyboard()
    .webApp("🚀 Jugar ahora", "https://tu-juego.com") // Aquí irá el link de tu frontend
    .row()
    .url("📢 Canal Oficial", "https://t.me/TuCanal");

  ctx.reply(
    `🛸 ¡Bienvenido a Space Miners, Capitán ${ctx.from.first_name}!\n\n` +
    "Tu flota está lista para extraer T-Coins. ¿Estás listo para conquistar la galaxia?",
    { reply_markup: keyboard }
  );
});

bot.start();
