exports.run = function(bot, msg, args) {
  msg.delete();
  msg.channel.sendEmbed({description: args.join(" ")});
};