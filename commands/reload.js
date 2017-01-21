const path = require("path");

exports.run = function(bot, msg, args) {
  if(!args || args.size < 1) return msg.edit(`Must provide a command to reload. Derp.`).then(setTimeout(msg.delete.bind(msg), 1000));
  delete require.cache[require.resolve(`.${path.sep}${args[0]}.js`)];
  msg.edit(`The command ${args[0]} has been reloaded`).then(setTimeout(msg.delete.bind(msg), 1000));
};