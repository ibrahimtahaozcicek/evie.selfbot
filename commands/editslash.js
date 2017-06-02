exports.run = (bot, msg, args) => {
  let name = args[0];
  let contents = args.slice(1).join(" ");
  bot.slashes.edit(bot, name, contents)
  .then(msg.edit("Shortcut was edited: "+name).then(msg.delete(2000)))
  .catch(e=> msg.edit(e).then(msg.delete(2000)));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'editslash',
  description: 'Edit the contents of a custom / shorcut.',
  usage: 'editslash [name] [contents]'
};