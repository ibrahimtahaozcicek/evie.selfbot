const path = require("path");

exports.run = function(client, msg, args) {
  if(!args || args.size < 1) return msg.edit(`Must provide a command to reload. Derp.`).then(setTimeout(msg.delete.bind(msg), 1000));
  const command = args[0];

  delete require.cache[require.resolve(`.${path.sep}${command}.js`)];
  let cmd = require(`./${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
  });
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
    client.aliases.set(alias, cmd.help.name);
  });

  msg.edit(`The command ${args[0]} has been reloaded`).then(setTimeout(msg.delete.bind(msg), 1000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'reload',
  description: 'Reloads a command that\'s been modified.',
  usage: 'reload [command]'
};