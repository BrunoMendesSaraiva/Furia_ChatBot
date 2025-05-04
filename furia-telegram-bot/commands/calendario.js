// Histórico: Tentativa inicial de integração via API externa (não utilizada por instabilidade)
// const axios = require('axios');

// module.exports = (bot) => {
//   bot.on('custom:calendario', async (msg) => {
//     const chatId = msg.chat.id;

//     try {
//       const { data } = await axios.get('https://hltv-api.vercel.app/api/matches');

//       // Filtra apenas jogos da FURIA
//       const furiaMatches = data.filter(match =>
//         match.team1.name.toLowerCase().includes('furia') ||
//         match.team2.name.toLowerCase().includes('furia')
//       );

//       if (furiaMatches.length === 0) {
//         return bot.sendMessage(chatId, '📅 Nenhum jogo da FURIA agendado no momento. Fique ligado para novidades!');
//       }

//       // Mostra até 3 próximos jogos
//       const resposta = furiaMatches.slice(0, 3).map(match => {
//         const date = new Date(match.date);
//         const dataFormatada = date.toLocaleDateString('pt-BR');
//         const hora = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

//         const evento = match.event?.name || 'Evento não especificado';
//         const adversario = match.team1.name.includes('FURIA') ? match.team2.name : match.team1.name;

//         return `📅 *${dataFormatada} às ${hora}*\n🆚 FURIA vs ${adversario}\n🏆 ${evento}`;
//       }).join('\n\n');

//       bot.sendMessage(chatId, `🔥 *Próximos jogos da FURIA:*\n\n${resposta}`, {
//         parse_mode: "Markdown"
//       });

//     } catch (error) {
//       console.error(error);
//       bot.sendMessage(chatId, '❌ Erro ao buscar os jogos da FURIA. Tente novamente mais tarde.');
//     }
//   });
// };

const fs = require('fs');
const path = require('path');

module.exports = (bot) => {

  // Evento customizado para exibir o calendário de jogos da FURIA
  bot.on('custom:calendario', (msg) => {
    const chatId = msg.chat.id;
    const filePath = path.join(__dirname, '../data/calendario.json');

    if (!fs.existsSync(filePath)) {
      return bot.sendMessage(chatId, '❌ Nenhum jogo disponível no momento.');
    }

    let jogos;
    try {
      jogos = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Leitura segura com tratamento de erros
    } catch (error) {
      console.error('Erro ao ler ou interpretar calendario.json:', error);
      return bot.sendMessage(chatId, '❌ Erro ao carregar o calendário. Tente novamente mais tarde.');
    }

    if (!Array.isArray(jogos) || jogos.length === 0) {
      return bot.sendMessage(chatId, '📅 Nenhum jogo agendado para a FURIA no momento.');
    }

    // Formata até 3 próximos jogos para exibição
    const resposta = jogos.slice(0, 3).map((jogo) => {
      return `📅 *${jogo.data}* às *${jogo.hora}*\n🆚 FURIA vs ${jogo.adversario}\n🏆 ${jogo.evento}`;
    }).join('\n\n');

    bot.sendMessage(chatId, `🔥 *Próximos jogos da FURIA:*\n\n${resposta}`, {
      parse_mode: 'Markdown'
    });
  });

};
