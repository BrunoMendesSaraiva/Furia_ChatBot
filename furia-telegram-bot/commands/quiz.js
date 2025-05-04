const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
  bot.on('custom:quiz', (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    let quizData;
    try {
      // Carrega o quiz dinamicamente (atualizações no JSON são lidas em tempo real)
      quizData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/quiz.json'), 'utf8'));
    } catch (error) {
      console.error('Erro ao carregar o arquivo de quiz:', error);
      return bot.sendMessage(chatId, '❌ Ocorreu um erro ao carregar as perguntas.');
    }

    if (!Array.isArray(quizData) || quizData.length === 0) {
      return bot.sendMessage(chatId, '❌ Nenhuma pergunta disponível no momento.');
    }

    // Sorteia uma pergunta
    const pergunta = quizData[Math.floor(Math.random() * quizData.length)];

    // Monta botões de resposta
    const opcoes = pergunta.respostas.map((resposta, index) => ([{
      text: resposta,
      callback_data: JSON.stringify({
        type: 'quiz',
        respostaIndex: index,
        correta: pergunta.correta
      })
    }]));

    // Envia a pergunta e opções
    bot.sendMessage(chatId, `❓ *${pergunta.pergunta}*`, {
      reply_markup: {
        inline_keyboard: opcoes
      },
      parse_mode: 'Markdown'
    });
  });

  // Trata a resposta do usuário
  bot.on('callback_query', async (callbackQuery) => {
    let data;
    try {
      data = JSON.parse(callbackQuery.data);
    } catch (error) {
      console.error('Erro ao processar callback_query:', error);
      return; // Ignora se não for JSON válido
    }

    // Verifica se o callback é do tipo quiz
    if (!data || data.type !== 'quiz') {
      return;
    }

    const chatId = callbackQuery.message.chat.id;
    const firstName = callbackQuery.from.first_name;

    try {
      // Remove os botões imediatamente para evitar múltiplos cliques
      await bot.editMessageReplyMarkup({ inline_keyboard: [] }, {
        chat_id: chatId,
        message_id: callbackQuery.message.message_id
      });

      const acertou = data.respostaIndex === data.correta;

      if (acertou) {
        bot.sendMessage(chatId, `✅ Boa, ${firstName}! Você acertou!`);
      } else {
        bot.sendMessage(chatId, `❌ Ops, ${firstName}! Resposta incorreta.`);
      }
    } catch (error) {
      console.error('Erro ao editar mensagem:', error);
    }
  });
};
