exports.run = (bot, msg, args) => {
  let list = bot.slashes.list(bot);
  msg.edit("`Slash Commands:`\n" + list);
};