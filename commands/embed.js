const Discord = require("discord.js");
exports.run = function(bot, msg, args) {
  msg.delete();
  const embed = new Discord.RichEmbed()
    .setDescription(args.join(" "))
    .setColor([114, 137, 218]);
  msg.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [">"],
  permLevel: 0
};

exports.help = {
  name: 'embed',
  description: 'Bans the mentioned user.',
  usage: '> Embed Text'
};