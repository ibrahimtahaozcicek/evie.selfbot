var heapdump = require('heapdump');

exports.run = function(bot, msg, args) {
  heapdump.writeSnapshot(function(err, filename) {
    console.log('dump written to', filename);
    msg.edit(`Heap Dump written to ${filename}`).then(setTimeout(msg.delete.bind(msg), 1500));
  });
};
