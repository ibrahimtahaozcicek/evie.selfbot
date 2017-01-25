# Root's Selfbot

This is the selfbot I use in my every day dealings with Discord. 

It's built in Discord.js version 10.0.1 (at the moment) but still works in version 11

## Downloading

Have git installed on your machine and run the following command:

`git clone https://github.com/eslachance/djs-selfbot.git`

Once finished: 

- `cd djs-selfbot`
- `npm install`
- Rename `selfbot.sqlite.example` to `selfbot.sqlite`
- Rename `config.json.example` to `config.json`
- Edit `config.json` and enter your token

## Getting your login token

> I AM NOT RESPONSIBLE AND CANNOT BE HELD LIABLE IF YOU MESS UP WITH SELFBOTS. THIS INCLUDES BUT IS NOT LIMITED TO LOSING PRIVILEGES, GETTING KICKED OR BANNED FROM SERVERS, OR BEING BANNED.

1. From either the web application, or the installed Discord app, use the **CTRL+SHIFT+I** keyboard shortcut.
2. This brings up the **Developer Tools**. Go to the **Application** tab
3. On the left, expand **Storage**, then click on the discordapp.com entry (it should be the only one).
4. Locate the entry called `token`, and copy it.

**KEEP YOUR TOKEN SECRET, AND NEVER SHARE IT WITH ANYONE**

## Starting the selfbot

To start the selfbot, in the command prompt, run the following command:
`node app.js`

For support join [York's Server](https://discord.gg/9ESEZAx) and talk to me!
