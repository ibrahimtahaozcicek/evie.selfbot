const Discord = require("discord.js");
const client = new Discord.Client();
const PersistentCollection = require("djs-collection-persistent");

if(process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system. If you ask me 'why doesn't your selfbot work' and I see this error I will slap you silly.");

const config = require('./config.json');
const fs = require("fs");

client.config = config;

require("./modules/functions.js")(client);

client.tags = new PersistentCollection({name: "tags"});
client.quotes = new PersistentCollection({name: "quotes"});
client.pages = new PersistentCollection({name: "guidepages"});

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
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(config.botToken);
client.password = config.password;
