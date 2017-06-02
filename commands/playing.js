exports.run = function(bot, msg, args) {
  var game = args.join(" ").trim();
  if(!game || game.length < 1) game = null;
  bot.user.setGame(game);
  msg.delete().catch(console.error);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["game"],
  permLevel: 0
};

exports.help = {
  name: 'playing',
  description: 'Changes the "Playing" status (game).',
  usage: 'playing [game name]'
};