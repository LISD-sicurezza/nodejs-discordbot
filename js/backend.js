const Discord = require("discord.js");
const bot = new Discord.Client();
const green = 0x00ff19;
const red = 0xff0008;
const pink = 0xc842f4;

const embedjson = require('./embed.json');
var json = JSON.stringify(embedjson.online);

var prefix = "!";
var chatLog = function(message) {
	console.log(`DSG[BOT]: ${message.content}`)
};

module.exports = {
	commands: function(message) {
		if (message.author.equals(bot.user)) return; // if bot is talking ignore any possible commands
		if (!message.content.startsWith(prefix)) return; // if command doesn't start with the right prefix just ignore it
		var args = message.content.substring(prefix.length).split(" ");
		message.channel.send(new Discord.RichEmbed().setTitle("CONSOLE LOG").setDescription(`${message.channel.toString()} ${message.author.toString()} : ${message.content}`).setColor(pink));
		switch (args[0].toLowerCase()) {
			case "prefix":
				if (args[1]) {
					var num = prefix.length+args[0].length+1;
					if (message.content.length != 9) {
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Prefix can only be 1 long").setColor(red));
					} else {
						prefix = message.content[num];
						message.channel.send(new Discord.RichEmbed().setTitle("Prefix changed to: " + prefix).setColor(green));
					};
				} else {
					message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Correct usage: !prefix !").setColor(red));
				}
				break;
			case "support":
				message.channel.send(new Discord.RichEmbed().setTitle(`All Staff have been notified you need help. When someone becomes available you will get a DM`).setColor(green));
				message.channel.send(new Discord.RichEmbed().setTitle(`SUPPORT REQUEST`).setDescription(`${message.author.toString()} Needs help`).setColor(red));
				break;
			case "coinflip":
				var heads = new Discord.RichEmbed().setDescription(`${message.author.toString()} HEADS`).setColor(green);
				var tails = new Discord.RichEmbed().setDescription(`${message.author.toString()} TAILS`).setColor(green);
				message.channel.send((Math.floor(Math.random() * 2) == 0) ? tails : heads).then(chatLog);
				break;



			case "setonline":
				if (args[1]) {
					embedjson.online = JSON.parse('"Test2"');
					message.channel.send(new Discord.RichEmbed().setTitle("Status changed to: " + json + " From: " + json).setColor(green));
				} else {
					message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Correct usage: !setplaying game here").setColor(red));
				}
				break;




			default:
				console.log(json);
				message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Unknown Command").setColor(red)).then(chatLog);
		}
	},
	addRole: function(member){
		member.guild.channels.find("name", "<#532626834987155457>").send(member.toString() + " Just joined the Server");
		message.author.send({ welcome });
		member.addRole(member.guild.roles.find("name", "Guest"));
	}
};