exports.run = (bot, msg, args) => {
  let list = bot.slashes.list(bot);
  msg.edit("`Slash Commands:`\n" + list);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'slashes',
  description: 'Lists the custom / shortcuts stored in the database.',
  usage: 'slashes'
};