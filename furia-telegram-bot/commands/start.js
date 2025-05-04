module.exports = (bot) => {

  // Comando /start - Envia mensagem inicial com teclado de navegação
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    bot.sendMessage(chatId, `Seja bem-vindo ao Bot da FURIA, *${firstName}*!\n\nEscolha uma opção abaixo:`, {
      parse_mode: "Markdown",
      reply_markup: {
        keyboard: [
          ['📊 Estatísticas', '📅 Calendário'],
          ['🎉 Torcida', '❓ Quiz', '📰 Notícias']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    });
  });

  // Gerencia todas as mensagens para redirecionar ações via eventos customizados
  bot.on('message', (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (!text) return; // Ignora mensagens sem texto (stickers, etc.)

    const comandos = {
      '📊 Estatísticas': 'custom:estatisticas',
      '📅 Calendário': 'custom:calendario',
      '🎉 Torcida': 'custom:torcida',
      '❓ Quiz': 'custom:quiz',
      '📰 Notícias': 'custom:noticias'
    };

    const evento = comandos[text];

    if (evento) {
      bot.emit(evento, msg); // Dispara o evento específico para cada funcionalidade
    } else if (!text.startsWith('/')) {
      bot.sendMessage(chatId, '❌ Opção inválida. Por favor, use o teclado abaixo para navegar.');
    }
  });
};
