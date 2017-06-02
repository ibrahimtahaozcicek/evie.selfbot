exports.run = function(bot, msg, args) {
    let name = args[0];
    let contents = args.slice(1).join(" ");
    bot.db.get(`SELECT * FROM tags WHERE name = '${args[0]}'`).then(row => {
      if(!row) {
        bot.db.run(`INSERT INTO "tags" (name, contents) VALUES (?, ?)`, [name, contents]).then(()=>{
          msg.edit("Tag was added: "+name).then(setTimeout(msg.delete.bind(msg), 1000));
        });
      }
      else  msg.edit(`Bitch that tag already exists`).then(setTimeout(msg.delete.bind(msg), 1000));
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'addtag',
  description: 'Creates a new tag',
  usage: 'addtag [name] [...contents]'
};