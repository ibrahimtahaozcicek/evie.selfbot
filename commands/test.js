exports.run = function(bot, msg, args) {
  msg.edit(`testing 1, 2, 1, 2`).then(setTimeout(msg.delete.bind(msg), 1000));
};