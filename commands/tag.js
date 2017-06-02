exports.run = function(bot, msg, args) {
  bot.db.get(`SELECT * FROM tags WHERE name = '${args[0]}'`).then(row => {
  if(row) {
    let message_content = msg.mentions.users.array().length === 1 ? `${msg.mentions.users.array()[0]} ${row.contents}` : row.contents;
    setTimeout( () => {
      msg.edit(message_content);
    }, 20);
    bot.db.run(`UPDATE tags SET used = used+1 WHERE name = '${args[0]}'`);
   }
   else msg.edit(`You dumbass, that tag doesn't exist. Go back to school!`).then(setTimeout(msg.delete.bind(msg), 1000));
 });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Displays the contents of a tag from the database.',
  usage: 'tag [tagname]'
};