exports.run = function(bot, msg, args) {
  var game = args.join(" ").trim();
  if(!game || game.length < 1) game = null;
  bot.user.setGame(game);
  msg.delete().catch(console.error);
};