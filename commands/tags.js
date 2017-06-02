exports.run = function(bot, msg, args) {
  bot.db.all("SELECT * FROM tags").then(rows=> {
    msg.edit(`List of tags: ${rows.map(r => `${r.name} (${r.used})`).join(" ; ")}`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tags',
  description: 'Displays a list of available tags in the database.',
  usage: 'tags'
};