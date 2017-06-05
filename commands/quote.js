exports.run = async (bot, msg, args) => {
  if(!args.length) return msg.edit(`Try with arguments, you sexy person you.`).then(msg.delete(1000));
  
  if(args[0] == "list") {
    const list = await bot.db.all("SELECT name FROM quotes");
    return msg.edit(`Quotes stored in database:\n\`\`\` \n${list.map(r=>r.name).join(", ")}\n\`\`\``);
  }
  
  if(args[0] == "tempfix") {
    await bot.db.run("ALTER TABLE quotes RENAME TO tmp_quotes;");
    await bot.db.run("CREATE TABLE quotes(name TEXT PRIMARY KEY NOT NULL, message TEXT NOT NULL, channel TEXT NOT NULL, author TEXT NOT NULL, embed BLOB NOT NULL)");
    await bot.db.run("INSERT INTO quotes(name, message, channel, author, embed) SELECT name, message, channel, author, embed FROM tmp_quotes;");
    await bot.db.run("DELETE TABLE tmp_quotes;");
    return msg.edit("Quote database has been fixed!").then(msg.delete(1000));
  }
  
  if(args[0] == "add") {
    try {
      if(args[1] && args[1] == "here") args[1] = msg.channel.id;
      const channel = bot.channels.get(args[1]);
      if(!channel) return  msg.edit(`Channel ID (argument 2) does not exist or was not provided.`).then(msg.delete(1000));
      let message = null;
      if(args[2] && args[2] == "last") {
        message = msg.channel.messages.secondLast();
      } else {
        message = await channel.fetchMessage(args[2]);
      }
      if(!message.id) return msg.edit(`Message ID (argument 3) doesn't seem to exist or was not provided.`).then(msg.delete(1000));
      if(!args[3]) return msg.edit(`Message Name (argument 4) was not provided.`).then(msg.delete(1000));
      
      const exists = await bot.db.get("SELECT message FROM quotes WHERE name = ?", [args[3]]);
      if(exists) return msg.edit(`Sorry that name already exists in the quote database!`).then(msg.delete(3000));
      
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
      
      await bot.db.run("INSERT INTO quotes (channel, message, author, name, embed) VALUES (?, ?, ?, ?, ?)",
        [channel.id, message.id, message.author.id, args[3], JSON.stringify(embed)])
        .catch(e=>console.log("error: ", e));
       msg.edit(`Quote Added to Database`).then(msg.delete(2000));

    } catch(e) {console.log("error: ", e)}
    return;
  }

  if(args[0] == "del") {
      if(!args[1]) return msg.edit(`Message Name (argument 2) must be provided`).then(msg.delete(1000));

      const exists = await bot.db.get("SELECT message FROM quotes WHERE name = ?", [args[1]]);
      if(!exists) return msg.edit(`I can't seem to find that message, though.`).then(msg.delete(3000));
      
      await bot.db.run("DELETE FROM quotes WHERE name = ?", [args[1]])
        .catch(e=>console.log("error: ", e));
      msg.edit(`Quote deleted from Database`).then(msg.delete(2000));
      return;
  }
  
  
  const exists = await bot.db.get("SELECT * FROM quotes WHERE name = ?", [args[0]]);
  if(!exists) return msg.edit(`I can't seem to find that message, though.`).then(msg.delete(3000));
  
  msg.delete();
  msg.channel.send({embed: JSON.parse(exists.embed)});
  
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
  usage: 'quote [options]'
};