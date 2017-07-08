const baseUrl = 'https://anidiots.guide';

/*
Relies on the following lines in app.js:
const PersistentCollection = require("djs-collection-persistent");
client.pages = new PersistentCollection({name: "guidepages"});

Want all the pages? run this:
/guide -import http://how.evie-banned.me/raw/linelipajo

*/

exports.run = async (client, msg, args) => {
  if(!args[0]) args[0] = "home";
  if(!msg.flags.length) {
    let name = args[0];
    if(!client.pages.has(name)) name = "home";
    const details = client.pages.get(name);
    return client.answer(msg, `${details.snippet}\n**Read More**: <${baseUrl}${details.url}>`);
  }
  
  const [name, ...extra] = args.slice(1);

  switch(msg.flags[0]) {
    case ("add") :
      const [url, ...snippet] = extra;
      if(client.pages.has(name)) return client.answer(msg, `The page name \`${name}\` already exist.`, {deleteAfter: true, delay: 5000});
      if(name.indexOf("/") == 0) return client.answer(msg, "You seem to have forgotten a tag name...", {deleteAfter: true, delay: 5000});
      if(url.indexOf("/") !== 0) return client.answer(msg, "URL is absolute and must start with `/`", {deleteAfter: true, delay: 5000});
      if(!snippet) return client.answer(msg, "You seem to have forgotten a tag name...", {deleteAfter: true, delay: 5000});
      client.pages.set(name, {url, snippet});
      client.answer(msg, `The page name \`${name}\` was added to the guide list.\n**URL**: \`${url}\`\n**Snippet**: ${snippet.join(" ")}`, {deleteAfter:false});
      break;
    case ("edit") :
      if(!client.pages.has(name)) return client.answer(msg, `The page name \`${name}\` does not exist. Use \`${client.config.prefix}guide -list\``);
      const page = client.pages.get(name);
      page.snippet = extra.join(" ");
      client.pages.set(name, page);
      client.answer(msg, `The snippet for page name \`${name}\` has been modified succesfully`, {deleteAfter:true});
      break;
    case ("import") :
      const pageData = await require("snekfetch").get(name);
      Object.entries(JSON.parse(pageData.text)).forEach(
        ([key, value]) => client.pages.set(key, value)
      );
      break;
    case ("export") :
      const pageExport = {};
      client.pages.forEach((s,p)=> {
          s = JSON.parse(s);
        pageExport[p] = {url: s.url, snippet: s.snippet};
      });

      const hasteURL = await require("snekfetch")
        .post("http://how.evie-banned.me/documents")
        .send(pageExport);
      client.answer(msg, `http://how.evie-banned.me/${hasteURL.body.key}.json`);
      break;
  }
};

exports.conf = {
  aliases: ["page", "g"],
  permLevel: 0
};

exports.help = {
  name: 'guide',
  description: 'Returns page details from the awesome bot guide.',
  usage: 'guide [-list] [name]',
  extended: `\`\`\`xl
-add newPageName /path/to/page.html Snippet describing the page
-del pageName
-edit pageName This is new new edited snippet
-rename pageName newName
-export // exports and returns URL
-import http://url-to-import/
-list
\`\`\``
};
