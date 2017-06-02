exports.run = (bot, msg, args) => {
  let name = args[0];
  bot.slashes.delete(bot, name)
  .then(msg.edit(`The slash command ${name} has been deleted`).then(msg.delete(2000)))
  .catch(e=> msg.edit(e).then(msg.delete(2000)));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'delslash',
  description: 'Deletes a saved custom / shortcut by name.',
  usage: 'delslash [slash name]'
};