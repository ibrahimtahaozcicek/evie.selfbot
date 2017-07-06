exports.run = async (client, msg, args) => {
  if(!args.length) return msg.edit(`Try with arguments, you sexy person you.`).then(msg.delete(1000));
  
  
  if(!msg.flags.length) {
    const [name, ...message] = args;
    if(!client.quotes.has(name)) return returnMessage(msg, `The quote \`${name}\` does not exist. Use \`${client.config.prefix}quote -help\` for help.`, {deleteAfter:true});
    const quote = client.quotes.get(name);
    msg.channel.send(message.join(" "), {embed: JSON.parse(quote.embed)});
    return msg.delete();
  }
  
  const [name, ...extra] = args.slice(1);
  
  switch(msg.flags[0]) {
    case ("add") :
      if(client.quotes.has(name)) return returnMessage(msg, `The quote \`${name}\` already exist.`, {deleteAfter:true});
      try{
        const channel = (extra[0] && extra[0] == "here" ? msg.channel : client.channels.get(extra[0]));
        if(!channel) return returnMessage(msg, `Channel ID (argument 2) does not exist or was not provided.`, {deleteAfter:true});
        
        let message = args[1] === "last" ? msg.channel.messages.last(2)[0] : await channel.fetchMessage(args[1]);
        if(!message.id) return returnMessage(msg, `Message ID (argument 3) doesn't seem to exist or was not provided.`, {deleteAfter:true});
        
        const embed = {
          color: 3447003,
          author: {
            name: `${message.author.username} (${message.author.id})`,
            icon_url: message.author.avatarURL()
          },
          description: message.content,
          timestamp: message.createdAt,
          footer: {
            text: `In ${channel.guild.name} : #${channel.name}`,
          },
        };
        
        client.quotes.set(name, {channel:channel.id, message: message.id, author: message.author.id, embed});
        returnMessage(msg, `The new quote \`${name}\` was added to the database.`, {deleteAfter:true});
      } catch(e) {console.log("error: ", e)}
      break;
    case ("del") :
      if(!client.quotes.has(name)) return returnMessage(msg, `The quote \`${name}\` does not exist. Use \`${client.config.prefix}tags -list\``, {deleteAfter:true});
      client.quotes.delete(name);
      returnMessage(msg, `The quote \`${name}\` has been deleted`, {deleteAfter:true});
      break;
    case ("list") :
      returnMessage(msg, "```\n" + client.quotes.map((s,k) =>k).join(", ") + "\n```");
      break;
    case ("help") :
    default:
      returnMessage(msg, this.help.extended);
      break;
  }
};


const returnMessage = (msg, contents, options = {}) => {
  options.delay =  (options.delay || 1000);
  options.deleteAfter = (options.deleteAfter || false);
  msg.edit(contents);
  if(options.deleteAfter) msg.delete({timeout: options.delay});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'quote',
  description: 'Saves or recalls a quote from someone (this requires extended help, see wiki)',
  usage: 'quote [options]',
  extended: `\`\`\`xl
-add QuoteName ChannelID||here MessageID||last
-del QuoteName
-list
\`\`\``
};