const backend = require('./backend.js');
const Discord = require("discord.js");
const bot = new Discord.Client();

const embedjson = require('./embed.json');
var json = JSON.stringify(embedjson.online);

const token = "NTMzNzQyNzI0NTI0ODAyMDY0.Dxvkpg.hSAt-oGv3nxSZ7kE2B_d7hLMogk";

bot.login(token);

bot.on("ready", function setGame(){
	bot.user.setActivity(json);
	console.log("Activity set as " + json);
});

bot.on("guildMemberAdd", backend.addRole);

bot.on("message", backend.commands);

/*bot.on("ready", function setGame(){
	bot.user.setActivity(activity);
	console.log("Activity set as " + activity);
});*/