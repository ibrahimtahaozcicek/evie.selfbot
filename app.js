'use strict';
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
require('discord.js-aliases');
const fs = require("fs-extra");

// Readline module test
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', input => {
  console.log(eval(input));
});

// Before using, rename `selfclient.sqlite.example` to `selfclient.sqlite`
const db = require('sqlite');
db.open('./selfbot.sqlite');

client.config = config;
client.db = db;

require("./modules/functions.js")(client);
client.slashes = require("./modules/slashes.js");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

fs.readdir('./events/', (err, files) => {
  if (err) console.error(err);
  console.log(`Loading a total of ${files.length} events.`);
  files.forEach(file => {
    const eventName = file.split(".")[0];
    // Forward slash (/) is also supported on Windows and required on some machines.
    // Source: https://nodejs.org/api/path.html#path_path_sep
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(config.botToken);
client.password = config.password;

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  console.error("Uncaught Exception: ", errorMsg);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});