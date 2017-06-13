exports.run = async (client, msg, args) => {
  const response = await client.awaitReply(msg, "Can y'all handle this?");
  msg.channel.send(response+"\nDon't funk with my heart!");
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'test',
  description: 'Dumping grounds for any test I make.',
  usage: 'test'
};
