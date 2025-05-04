module.exports = (bot) => {

  // Evento customizado para exibir mensagem de apoio à equipe FURIA
  bot.on('custom:torcida', (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    const mensagem = `
🎉 *Vamos juntos apoiar a FURIA, ${firstName}!*

🐺 A FURIA é raça, garra e paixão pelo Counter-Strike!
🔥 Estamos sempre prontos para dar show nos campeonatos!
💪 Continue torcendo, cada partida é uma batalha e cada vitória é nossa!

*#DaleFURIA #SomosFURIA #FURIAonTop*
`;

    bot.sendMessage(chatId, mensagem, { parse_mode: 'Markdown' }); // Envia mensagem formatada para o usuário
  });

};
