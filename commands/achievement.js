const snekfetch = require('snekfetch');

exports.run = (bot, msg, args) => {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["Achievement Get!", title];
  }
  if(title.length > 22 || contents.length > 22) return msg.edit("Max Length: 22 Characters. Soz.").then(setTimeout(msg.delete.bind(msg), 1000));
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
  msg.delete();
  //snekfetch.get('https://s.gus.host/o-SNAKES-80.jpg')
  //.then(r => fs.writeFile('download.jpg', r.body));

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mca"],
  permLevel: 0
};

exports.help = {
  name: 'achievement',
  description: 'Send a Minecraft Achievement image to the channel',
  usage: 'achievement Title|Text (/achievement Achievement Get|Used a Command!)'
};