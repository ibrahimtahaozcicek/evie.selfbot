module.exports = (client) => {
  global.wait = require('util').promisify(setTimeout);

  global.range = (count, start = 0) => {
    const myArr = [];
    for(var i = 0; i<count; i++) {
      myArr[i] = i+start;
    }
    return myArr;
  };
  
  client.elevation = message => (message.author.id === client.user.id);
  
  client.log = (type, title, author, msg) => {
    const logChannel = (type === "mention") ? client.channels.get(client.config.channels.mentions) : client.channels.get(client.config.channels.logs);
    if(!logChannel) return console.log(`[${type}] [${title}]\n[${author.username} (${author.id})]${msg}`);
    logChannel.send({embed: {
      color: 3447003,
      author: {
        name: `${author.username} (${author.id})`,
        icon_url: author.avatarURL()
      },
      title: title,
      url: '',
      description: msg
    }});
  };
  
};