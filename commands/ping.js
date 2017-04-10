exports.run = (bot, msg, args) => {
  msg.delete();
  msg.channel.send("Ping?").then(m => m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`) );
};