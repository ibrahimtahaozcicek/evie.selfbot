/* global wait */
const fs = require("fs");
module.exports = async client => {
  delete client.user.email;
  delete client.user.verified;
  try {
    const { id: rebootMsgID , channel: rebootMsgChan} = JSON.parse(fs.readFileSync('./reboot.json', 'utf8'));
    const m = await client.channels.get(rebootMsgChan).messages.fetch(rebootMsgID);
    await m.edit('Rebooted!');
    await m.edit(`Rebooted! (took: \`${m.editedTimestamp - m.createdTimestamp}ms\`)`);
    fs.unlink('./reboot.json', ()=>{});
  } catch(O_o){}
  await wait(2000);
  client.log("log", "Bot Ready", client.user, `Ready to spy on ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
  
  // Test: Loop for inactivity!
  client.myStatus.interval = setInterval(() => {
    if(Date.now() - client.myStatus.lastSpoken > 1000*60 && !client.myStatus.away) {
      console.log("Currently Away!");
      client.myStatus.away = true;
    }
  }, client.myStatus.timeout);
};