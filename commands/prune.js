exports.run = function(bot, msg, args) {
  let messagecount = parseInt(args[0]) ? parseInt(args[0]) : 1;
  msg.channel.fetchMessages({limit: 100})
  .then(messages => {
    let msg_array = messages.array();
    msg_array = msg_array.filter(m => m.author.id === bot.user.id);
    msg_array.length = messagecount + 1;
    msg_array.map(m => m.delete().catch(console.error));
   });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'prune',
  description: 'Prunes messages from yourself only.',
  usage: 'prune [number of messages]'
};