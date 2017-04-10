exports.run = (bot, msg, args) => {
  let name = args[0];
  bot.slashes.delete(bot, name)
  .then(msg.edit(`The slash command ${name} has been deleted`).then(msg.delete(2000)))
  .catch(e=> msg.edit(e).then(msg.delete(2000)));
};