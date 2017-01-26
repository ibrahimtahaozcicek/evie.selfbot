'use strict';
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');

const log = (type, title, author, msg) => {
  console.log(title + "\n" + msg);
  /*const logChannel = (type === "mention") ? bot.channels.get(config.channels.mentions) : bot.channels.get(config.channels.logs);
  if(!logChannel) return console.log(`[${type}] [${title}] ${msg}`);
  logChannel.sendMessage("", {embed: {
    color: 3447003,
    author: {
      name: `${author.username} (${author.id})`,
      icon_url: author.avatarURL
    },
    title: title,
    url: '',
    description: msg
  }});*/
};

// Before using, rename `selfbot.sqlite.example` to `selfbot.sqlite`
const db = require('sqlite');
db.open('./selfbot.sqlite');

bot.config = config;
bot.db = db;

bot.slashes = require("./modules/slashes.js");

bot.on('ready', () => {
  log("log", "Bot Ready", bot.user, `Selfbot Rewrite: Ready to spy on ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
  delete bot.user.email;
  delete bot.user.verified;
  bot.slashes.init(bot);
  console.log("=> Ready");
});

bot.on('message', msg => {
  if(msg.isMentioned(bot.user.id) || msg.mentions.everyone || (msg.guild && msg.mentions.roles.filter(r=>msg.guild.member(bot.user.id).roles.has(r.id)).size > 0)) {
    log("mention", `${msg.guild.name} #${msg.channel.name}`, msg.author, msg.content);
  }

  if(msg.author.id !== bot.user.id) return;
  if(!msg.content.startsWith(config.prefix)) return;
  
  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length);
  
  let slash = bot.slashes.get(command);
  if(slash) {
    msg.edit(slash.contents);
    return;
  }
  try {
    let cmdFile = require("./commands/" + command);
    cmdFile.run(bot, msg, args);
  } catch(e) {
    //msg.edit(msg.author + `Error while executing command\n${e}`).then(setTimeout(msg.delete.bind(msg), 1000));
  }
});

/*
bot.on("guildMemberAdd", (member) => {
  if(member.guild.id === "163038706117115906") {
    console.log(`${member.user.username} (${member.user.id}) has joined TB Lounge`);
    bot.channels.get("273163062943678464").sendEmbed({
      color: 3447003,
      author: {
        name: `${member.user.username} (${member.user.id})`,
        icon_url: member.user.avatarURL
      },
      description: `Joined | ${require("moment")().format('MMMM Do YYYY, HH:mm:ss ZZ')}\nCreated: | ${require("moment")(member.user.createdTimestamp).format('MMMM Do YYYY, HH:mm:ss ZZ')}`
    });
  }
});

bot.on("guildMemberRemove", (member) => {
  if(member.guild.id === "163038706117115906") {
    console.log(`${member.user.username} (${member.user.id}) has left TB Lounge`);
    bot.channels.get("273163062943678464").sendEmbed({
      color: 0xff0000,
      author: {
        name: `${member.user.username} (${member.user.id})`,
        icon_url: member.user.avatarURL
      },
      description: `Left | ${require("moment")().format('MMMM Do YYYY, HH:mm:ss ZZ')}`
    });
  }
});*/

bot.on('error', console.error);
bot.on('warn', console.warn);
bot.on('disconnect', console.warn);

bot.login(config.botToken);
bot.password = config.password;

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  log("error", "Uncaught Exception", bot.user, errorMsg);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error", bot.user, err);
});