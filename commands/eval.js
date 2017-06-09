const Discord = require("discord.js");

exports.run = async (bot, msg, args) => {
  var code = args.join(" ");
  try {
      var evaled = eval(code);
      if (evaled && evaled.constructor.name == 'Promise')
        evaled = await evaled;
      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled);
      msg.channel.sendMessage(`\`\`\`xl\n${clean(evaled)}\n\`\`\``
      );        
  }
  catch(err) {
      msg.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'eval',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [...code]'
};


function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  }
  else {
      return text;
  }
}