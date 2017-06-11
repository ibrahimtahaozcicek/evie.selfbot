const fs = require("fs");
exports.run = function(bot, msg, args) {
  msg.edit("Rebooting...").then(m=>{
    fs.writeFile('./reboot.json', `{"id": "${msg.id}", "channel": "${msg.channel.id}"}`, (err) => {
      if (err) console.error(err);
      bot.tags.close();
      bot.quotes.close();
      process.exit(1);
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: 0
};

exports.help = {
  name: 'reboot',
  description: 'Restarts bot and indicates the reboot time.',
  usage: 'reboot'
};