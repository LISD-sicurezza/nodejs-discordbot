const chatCommands = require('./js/core_commands.js');
const serverManage = require('./js/core_servermanage.js')
const Discord = require("discord.js");
const util = require('util');
const bot = new Discord.Client();

const config = require('./js/config.json');

process.on('unhandledRejection', (reason, promise) => {
  console.log('TEMP FIX: Unhandled Rejection at:', reason.stack || reason)
})

bot.login(config.token);

bot.on("ready", function setGame(){
	bot.user.setActivity(config.online);
	console.log(`Bot is ready Activity set as ${config.online}`)
});

bot.on("guildMemberAdd", serverManage.onJoin);
bot.on("message", chatCommands.commands);