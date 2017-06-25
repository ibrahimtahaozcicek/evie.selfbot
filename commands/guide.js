const baseUrl = 'https://anidiots.guide';

/* 
Relies on the following lines in app.js: 
const PersistentCollection = require("djs-collection-persistent");
client.pages = new PersistentCollection({name: "guidepages"});

Want all the pages? run this: 
/guide -import http://how.evie-banned.me/raw/linelipajo

*/

exports.run = async (client, msg, args) => {
  const pages = client.pages;
  if(!args[0]) args[0] = "home";
  if(args[0].indexOf("-") !== 0) {
    let name = args[0];
    if(!pages.has(name)) name = "home";
    const details = pages.get(name);
    return client.answer(msg, `${details.snippet}\n**Read More**: <${baseUrl}${details.url}>`);
  }
  
  const action = args[0].slice(1);
  const [name, ...extra] = args.slice(1);
  
  switch(action) {
    case ("add") :
      const [url, ...snippet] = extra;
      if(pages.has(name)) return client.answer(msg, `The page name \`${name}\` already exist.`, {deleteAfter: true, delay: 5000});
      if(name.indexOf("/") == 0) return client.answer(msg, "You seem to have forgotten a tag name...", {deleteAfter: true, delay: 5000});
      if(url.indexOf("/") !== 0) return client.answer(msg, "URL is absolute and must start with `/`", {deleteAfter: true, delay: 5000});
      if(!snippet) return client.answer(msg, "You seem to have forgotten a tag name...", {deleteAfter: true, delay: 5000});
      pages.set(name, {url, snippet});
      client.answer(msg, `The page name \`${name}\` was added to the guide list.\n**URL**: \`${url}\`\n**Snippet**: ${snippet.join(" ")}`, {deleteAfter:false});
      break;
    case ("del") :
      if(!pages.has(name)) return client.answer(msg, `The page name \`${name}\` does not exist. Use \`${client.config.prefix}guide -list\``);
      pages.delete(name);
      client.answer(msg, `The page name \`${name}\` has been deleted`, {deleteAfter:true});
      break;
    case ("rename") :
      if(!pages.has(name)) return client.answer(msg, `The page name \`${name}\` does not exist. Use \`${client.config.prefix}guide -list\``);
      if(!extra || extra.length > 1) return client.answer(msg, `Please enter a new page name of a single word.`);
      const tag = pages.get(name);
      pages.delete(name);
      pages.set(extra, tag);
      client.answer(msg, `The page name \`${name}\` has been deleted`, {deleteAfter:true});
      break;
    case ("edit") :
      if(!pages.has(name)) return client.answer(msg, `The page name \`${name}\` does not exist. Use \`${client.config.prefix}guide -list\``);
      const page = pages.get(name);
      page.snippet = extra.join(" ");
      pages.set(name, page);
      client.answer(msg, `The snippet for page name \`${name}\` has been modified succesfully`, {deleteAfter:true});
      break;
    case ("list") :
      const options = (extra[0] === "del" ? {deleteAfter: true, delay: 10000} : {deleteAfter : false});
      client.answer(msg, "```\n" + pages.keyArray().join(", ") + "\n```", options);
      break;
    case ("import") :
      const pageData = await require("snekfetch").get(name);
      Object.entries(JSON.parse(pageData.text)).forEach(
        ([key, value]) => pages.set(key, value)
      );
      break;
    case ("export") :
      const pageExport = {};
      pages.forEach((s,p)=> {
          s = JSON.parse(s);
        pageExport[p] = {url: s.url, snippet: s.snippet};
      });
      
      const hasteURL = await require("snekfetch")
        .post("http://how.evie-banned.me/documents")
        .send(pageExport);
      client.answer(msg, `http://how.evie-banned.me/${hasteURL.body.key}.json`);
      break;
    case ("help") :
    default:
      const optionsHelp = (extra[0] === "del" ? {deleteAfter: true, delay: 5000} : {deleteAfter : false});
      let message = `\`\`\`xl
-add newPageName /path/to/page.html Snippet describing the page
-del pageName
-edit pageName This is new new edited snippet
-rename pageName newName
-export // exports and returns URL
-import http://url-to-import/
-list
\`\`\``;
      client.answer(msg, message, optionsHelp);
      break;
  }
};

exports.conf = {
  aliases: ["page"],
  permLevel: 0
};

exports.help = {
  name: 'guide',
  description: 'Returns page details from the awesome bot guide.',
  usage: 'guide [-list] [name]',
};