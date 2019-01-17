const backend = require('./backend.js');
const mod = require('./moderation.js');
const Discord = require("discord.js");
const bot = new Discord.Client();

const embedjson = require('./config.json');
var json = JSON.stringify(embedjson.online);

const token = "NTMzNzQyNzI0NTI0ODAyMDY0.Dxvkpg.hSAt-oGv3nxSZ7kE2B_d7hLMogk";

// uses the token needed to login the bot
bot.login(token);

// when the bot is ready
bot.on("ready", function setGame(){
	bot.user.setActivity(json);
	console.log("Activity set as " + json);
});

bot.on("guildMemberAdd", backend.addRole);

bot.on("message", mod.staff); // backend.commands to have it run the regular commands

// To start the bot use startluke.bat then type node start.js
