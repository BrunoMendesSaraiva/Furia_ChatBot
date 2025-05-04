const fs = require('fs');
const path = require('path');

module.exports = (bot) => {

  // Evento customizado para exibir estatísticas dos jogadores da FURIA
  bot.on('custom:estatisticas', (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const filePath = path.join(__dirname, '../data/estatisticas.json');

    if (!fs.existsSync(filePath)) {
      return bot.sendMessage(chatId, '❌ Arquivo de estatísticas não encontrado.');
    }

    let dados;
    try {
      dados = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Leitura segura com tratamento de erro
    } catch (error) {
      console.error('Erro ao ler ou interpretar estatisticas.json:', error);
      return bot.sendMessage(chatId, '❌ Erro ao carregar as estatísticas. Tente novamente mais tarde.');
    }

    if (!Array.isArray(dados) || dados.length === 0) {
      return bot.sendMessage(chatId, '⚠️ Nenhuma estatística disponível no momento.');
    }

    // Formata as estatísticas de cada jogador para exibição
    const resposta = dados.map(j => 
      `👤 *${j.nome}*\n` +
      `⭐ *Rating:* ${j.rating}\n` +
      `🔫 *K/D:* ${j.kd}\n` +
      `📉 *DPR:* ${j.dpr ?? 'N/A'} | 📈 *KPR:* ${j.kpr ?? 'N/A'}\n` +
      `🧠 *Impact:* ${j.impact ?? 'N/A'} | 🎯 *ADR:* ${j.adr ?? 'N/A'}\n` +
      `🎯 *KAST:* ${j.kast ?? 'N/A'}`
    ).join('\n\n');

    bot.sendMessage(chatId, `📊 *Estatísticas da FURIA para você, ${firstName}:*\n\n${resposta}`, {
      parse_mode: 'Markdown'
    });
  });

};
