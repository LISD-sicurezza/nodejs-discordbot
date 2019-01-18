const chatCommands = require('./commands.js');
const serverManage = require('./servermanage.js')
const Discord = require("discord.js");
const util = require('util');
const bot = new Discord.Client();

const config = require('./config.json');
// uses the token needed to login the bot
bot.login(config.token);

// when the bot is ready
bot.on("ready", function setGame(){
	bot.user.setActivity(config.online);
	console.log(`Bot is ready Activity set as ${config.online}`)
});

bot.on("guildMemberAdd", serverManage.onJoin);
bot.on("message", chatCommands.commands);

// To start the bot use startluke.bat then type node start.js
// backend is no longer in use
