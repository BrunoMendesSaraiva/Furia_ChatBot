require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const start = require('./commands/start');
const calendario = require('./commands/calendario');
const estatisticas = require('./commands/estatisticas');
const quiz = require('./commands/quiz');
const torcida = require('./commands/torcida');
const noticias = require('./commands/noticias');


const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

start(bot);
calendario(bot);
estatisticas(bot);
quiz(bot);
torcida(bot);
noticias(bot);

console.log("🤖 FURIA Bot está rodando!");
