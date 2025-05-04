const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
  bot.on('custom:noticias', (msg) => {
    const chatId = msg.chat.id;
    const filePath = path.join(__dirname, '../data/noticias.json');

    if (!fs.existsSync(filePath)) {
      return bot.sendMessage(chatId, '❌ Nenhuma notícia disponível no momento.');
    }

    const noticias = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!Array.isArray(noticias) || noticias.length === 0) {
      return bot.sendMessage(chatId, '📰 Nenhuma notícia encontrada no momento.');
    }

    const resposta = noticias.slice(0, 3).map((noticia) => {
      const titulo = noticia.titulo || 'Título não disponível';
      const link = noticia.link || '#';
      const data = noticia.data || 'Data desconhecida';

      return `📰 *${titulo}*\n📅 ${data}\n🔗 [Ler notícia](${link})`;
    }).join('\n\n');

    bot.sendMessage(chatId, `🗞️ *Últimas notícias da FURIA:*\n\n${resposta}`, {
      parse_mode: 'Markdown'
    });
  });
};
