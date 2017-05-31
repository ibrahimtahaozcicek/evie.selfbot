'use strict';
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');
require('discord.js-aliases');

// Readline module test
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', input => {
  console.log(eval(input));
});

const log = (type, title, author, msg) => {
  const logChannel = (type === "mention") ? bot.channels.get(config.channels.mentions) : bot.channels.get(config.channels.logs);
  if(!logChannel) return console.log(`[${type}] [${title}]\n[${author.username} (${author.id})]${msg}`);
  logChannel.send({embed: {
    color: 3447003,
    author: {
      name: `${author.username} (${author.id})`,
      icon_url: author.avatarURL()
    },
    title: title,
    url: '',
    description: msg
  }});
};
bot.log = log;

bot.on("debug", m => console.log);

// Before using, rename `selfbot.sqlite.example` to `selfbot.sqlite`
const db = require('sqlite');
db.open('./selfbot.sqlite');

bot.config = config;
bot.db = db;

bot.slashes = require("./modules/slashes.js");

bot.on('ready', async () => {
  delete bot.user.email;
  delete bot.user.verified;
  bot.slashes.init(bot);
  await bot.wait(1000);
  log("log", "Bot Ready", bot.user, `Ready to spy on ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
});

bot.once('ready', async () => {
  const fs = require("fs");
  try {
    const { id: rebootMsgID , channel: rebootMsgChan} = JSON.parse(fs.readFileSync('./reboot.json', 'utf8'));
    const m = await bot.channels.get(rebootMsgChan).fetchMessage(rebootMsgID);
    await m.edit(`Rebooted! (took: \`${m.editedTimestamp - m.createdTimestamp}ms\`)`);
    fs.unlink('./reboot.json', ()=>{});
  } catch(O_o){console.error("Error while setting rebooted timestamp: " + O_o)}
  bot.db.run("CREATE TABLE IF NOT EXISTS quotes(channel TEXT PRIMARY KEY, message TEXT NOT NULL, author TEXT NOT NULL, name TEXT NOT NULL, embed BLOB NOT NULL)");
});

bot.on('message', (msg) => {
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
  } catch(O_o){}
});

bot.on('error', console.error);
bot.on('warn', console.warn);
bot.on('disconnect', console.warn);

bot.login(config.botToken);
bot.password = config.password;

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  console.error("Uncaught Exception: ", errorMsg);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

// Yeah yeah this is stupid shut up about it.
const wait = async (delay) => {
  return new Promise((res, rej) => {
    setTimeout(res, delay);
  });
};
bot.wait = wait;

const range = (count, start = 0) => {
  const myArr = [];
  for(var i = 0; i<count; i++) {
    myArr[i] = i+start;
  }
  return myArr;
};
bot.range = range;