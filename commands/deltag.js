exports.run = function(bot, msg, args) {
  bot.db.run(`DELETE FROM tags WHERE name = '${args[0]}'`).then( () => {
    msg.edit(`The tag ${args[0]} has been deleted`).then(setTimeout(msg.delete.bind(msg), 1000));
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'deltag',
  description: 'Deletes a saved tag.',
  usage: 'deltag [tag name]'
};