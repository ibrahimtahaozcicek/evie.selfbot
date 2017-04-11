const Discord = require("discord.js");

exports.run = async (bot, msg, args) => {
  await msg.delete();
  const embed = new Discord.RichEmbed()
  .setTitle("Testing")
  .addField("Channel", msg.channel.toString(), true)
  .setFooter("this is a footer", bot.user.avatarURL);
  
  msg.channel.sendEmbed(embed);
};