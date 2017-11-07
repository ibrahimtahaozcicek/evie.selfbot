const ignored = ["PRESENCE_UPDATE", "TYPING_START", "MESSAGE_CREATE", "GUILD_SYNC", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE"];
const accepted = ["MESSAGE_DELETE", "MESSAGE_UPDATE", "MESSAGE_BULK_DELETE"];

const build = (message) => {
  const client = message.client;
  if(message.mentions.users.has(client.user.id) || message.mentions.everyone || (message.guild && message.mentions.roles.filter(r=>message.guild.member(client.user.id).roles.has(r.id)).size > 0)) {
    const chan = !!message.guild ? `${message.guild.name} #${message.channel.name}` : "";
    return {
      chan,
      id:message.id,
      ts:message.createdTimestamp,
      mEveryone:message.mentions.everyone,
      mUser:message.mentions.users.has(client.user.id),
      mRole:(message.guild && message.mentions.roles.filter(r=>message.guild.member(client.user.id).roles.has(r.id)).size > 0)
    };
  } else {
    return false;
  }
};

module.exports = async (client, data) => {
  const { t, d } = data;
  if(!accepted.includes(t)) return;
  if (t === 'MESSAGE_UPDATE' && client.mentions.has(d.id)) {
    const oldmsg = client.mentions.get(d.id);
    const newmsg = await client.channels.get(d.channel_id).messages.fetch(d.id);
    const isMentioned = build(newmsg);
    if(!isMentioned) {
      client.log("mention", oldmsg.chan, oldmsg.author, `***GHOST MENTION***\n${oldmsg.content}`);
    }
    return;
  }
  
  else if (t === 'MESSAGE_DELETE' && client.mentions.has(d.id)) {
    const oldmsg = client.mentions.get(d.id);
    client.log("mention", oldmsg.chan, oldmsg.author, `***GHOST MENTION***\n${oldmsg.content}`);
    return;
  }
  
  else if (t === 'MESSAGE_BULK_DELETE' && d.ids.some(id=> client.mentions.has(id))) {
    console.log(t + " CONTAINED A MENTION STOP BEING LAZY");
    return;
  }
};