const PCClass = require('../modules/PCClass.js');

exports.run = async (client, msg, args) => {
  if(!args[0] && !msg.flags.length) msg.flags.push("list");

  if(!msg.flags.length) {
    const [name, ...message] = args;
    if(!this.db.has(name)) return client.answer(msg, `The tag \`${name}\` does not exist. Use \`${client.config.prefix}tags -help\` for help.`, {deleteAfter:true});
    const tag = this.db.get(name);
    return client.answer(msg, `${message.join(" ")}${tag}`);
  }

  const [name, ...extra] = args;
  data = {contents: extra.join(" ")};
  let response = await this.db[msg.flags[0]](name, data);
  client.answer(msg, response, {deleteAfter:true});
};

exports.init = client => {
  this.db = new PCClass(client, "tags");
  this.db.extendedHelp = this.help.extended;
  client.tags = this.db;
}

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
