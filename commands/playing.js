exports.run = function(bot, msg, args) {
  var game = args.join(" ");
  bot.user.setGame(game);
  msg.delete().catch(console.error);
};