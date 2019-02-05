const chatCommands = require('./commands.js');
const serverManage = require('./servermanage.js')
const Discord = require("discord.js");
const util = require('util');
const bot = new Discord.Client();

const config = require('./config.json');

bot.login(config.token);

bot.on("ready", function setGame(){
	bot.user.setActivity(config.online);
	console.log(`Bot is ready Activity set as ${config.online}`)
});

bot.on("guildMemberAdd", serverManage.onJoin);
bot.on("message", chatCommands.commands);
