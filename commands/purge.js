exports.run = function(bot, msg, args) {
  let messagecount = parseInt(args[0]) ? parseInt(args[0]) : 1;
  msg.channel.fetchMessages({limit: messagecount})
  .then(messages => {
    messages.map(m => m.delete().catch(console.error) );
  }).catch(console.error);
};