exports.run = function(bot, msg, args) {
  msg.delete();
    msg.channel.sendMessage("", {embed: {
      color: 3447003,
      description: args.join(" ")
    }});
};