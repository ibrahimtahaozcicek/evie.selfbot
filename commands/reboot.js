const fs = require("fs");
exports.run = function(bot, msg, args) {
  msg.edit("Rebooting...").then(m=>{
    fs.writeFile('./reboot.json', `{"id": "${msg.id}", "channel": "${msg.channel.id}"}`, (err) => {
      if (err) console.error(err);
      process.exit(1);
    });
  });
};