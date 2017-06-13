/* BASE COMMAND EXAMPLE, MODIFY TO SUIT YOUR NEEDS */

exports.run = (bot, msg, args) => {
  const members = msg.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
  return msg.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "Nobody has an invite link as game name.");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ci"],
  permLevel: 0
};

exports.help = {
  name: 'checkinvites',
  description: 'Returns a list of members with an invite as their game.',
  usage: 'checkinvites'
};