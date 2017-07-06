exports.run = (client, msg, args) => {
  if(!args[0] && !msg.flags.length) msg.flags.push("list");
  
  if(!msg.flags.length) {
    const [name, ...message] = args;
    if(!client.tags.has(name)) return client.answer(msg, `The tag \`${name}\` does not exist. Use \`${client.config.prefix}tags -help\` for help.`, {deleteAfter:true});
    const tag = client.tags.get(name);
    return client.answer(msg, `${message.join(" ")}${tag}`);
  }

  const [name, ...extra] = args;
  
  switch(msg.flags[0]) {
    case ("add") :
      if(client.tags.has(name)) return client.answer(msg, `The tag \`${name}\` already exist.`, {deleteAfter:true});
      client.tags.set(name, extra.join(" "));
      client.answer(msg, `The new tag \`${name}\` was added to the database.`, {deleteAfter:true});
      break;
    case ("del") :
      if(!client.tags.has(name)) return client.answer(msg, `The tag \`${name}\` does not exist. Use \`${client.config.prefix}tags -list\``, {deleteAfter:true});
      client.tags.delete(name);
      client.answer(msg, `The tag \`${name}\` has been deleted`, {deleteAfter:true});
      break;
    case ("edit") :
      if(!client.tags.has(name)) return client.answer(msg, `The tag \`${name}\` does not exist. Use \`${client.config.prefix}tags -list\``, {deleteAfter:true});
      const tag = client.tags.get(name);
      tag.contents = extra;
      client.tags.set(name, tag);
      break;
    case ("list") :
      client.answer(msg, "```\n" + client.tags.map((s,k) =>k).join(", ") + "\n```");
      break;
    case ("help") :
    default:
      client.answer(msg, this.help.extended);
      break;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tags"],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Show or modify tags.',
  usage: 'tag <action> [tagname] <contents> (use -help action to show additional help)',
  extended: `\`\`\`
-add newTagName This is your new tag contents
-del tagName
-edit existingtagName This is new new edited contents
-list
\`\`\``
};