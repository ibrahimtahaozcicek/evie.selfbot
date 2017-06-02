const fs = require("fs");
module.exports = async client => {
  delete client.user.email;
  delete client.user.verified;
  client.slashes.init(client);
  await client.wait(1000);
  client.log("log", "Bot Ready", client.user, `Ready to spy on ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);

  try {
    const { id: rebootMsgID , channel: rebootMsgChan} = JSON.parse(fs.readFileSync('./reboot.json', 'utf8'));
    const m = await client.channels.get(rebootMsgChan).fetchMessage(rebootMsgID);
    await m.edit(`Rebooted! (took: \`${m.editedTimestamp - m.createdTimestamp}ms\`)`);
    fs.unlink('./reboot.json', ()=>{});
  } catch(O_o){console.error("Error while setting rebooted timestamp: " + O_o)}
  client.db.run("CREATE TABLE IF NOT EXISTS quotes(channel TEXT PRIMARY KEY, message TEXT NOT NULL, author TEXT NOT NULL, name TEXT NOT NULL, embed BLOB NOT NULL)");

};