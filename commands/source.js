exports.run = function(bot, msg, args) {
  const [replyTo, ...replyText] = args;
  msg.channel.fetchMessages({limit: 1, around: replyTo})
  .then(messages=> {
    const replyToMsg = messages.first();
    msg.channel.sendMessage(`Source Code for MSG ID ${replyTo}: \`\`\`md\n${clean(replyToMsg.content)}\n\`\`\``)
    .then(() => msg.delete());
  }).catch(console.error);
};


function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  }
  else {
      return text;
  }
}