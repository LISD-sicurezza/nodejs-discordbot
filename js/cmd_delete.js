const Discord = require("discord.js");
const Perm = require("./core_permissions.js");
const config = require('./config.json');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

const green = 0x00ff19;
const red = 0xff0008;
const pink = 0xc842f4;
const purple = 0x7f00ff;

var del = message => {message.delete(5000).catch(O_o=>{})};
var del60 = message => {message.delete(20000).catch(O_o=>{})};

/* deletes a message after 10secs this is used to delete notice commands then they go away*/
var del = message => {message.delete(5000).catch(O_o=>{})};
var del60 = message => {message.delete(20000).catch(O_o=>{})};
var delCmd = message => {message.delete().catch(O_o=>{})};

module.exports.run = async (bot, message, args) => {
	var delCmd = message.delete().catch(O_o=>{});
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	if (!message.member.roles.some(Perm.isMod)) { //Array.some() used to find roles allowed to use this command
			delCmd;
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
		  .setDescription("You are not a Mod / Admin!")
			.setColor(red)).then(del)
	} else {
		delCmd;
	  let deleteCount = parseInt(args[1], 10);
		if (!deleteCount || deleteCount < 2 || deleteCount > 99) {
				message.channel.send(new Discord.RichEmbed()
				.setTitle("ERROR!")
			  .setDescription(`Usage: ${config.prefix}delete [2-99]`)
				.setColor(red)).then(del)
		} else {
			if (message.member.roles.some(Perm.isMod)) {
					const fetched = await message.channel.fetchMessages({limit: deleteCount});
				  message.channel.bulkDelete(fetched);
				  let delNum = "PLACEHOLDER"
					message.channel.send(new Discord.RichEmbed()
					.setTitle("MODERATION NOTICE")
				  .setDescription(`DELETED [${delNum}] Total Messages`)
					.setColor(purple)).then(del)
					channel.send(new Discord.RichEmbed()
					.setTitle("MODERATION NOTICE")
				  .setDescription(`${message.author.toString()} has DELETED [${delNum}] Messages in ${message.channel.toString()}`)
					.setColor(purple))
			} else {
					message.channel.send(new Discord.RichEmbed()
					.setTitle("CAUGHT ERROR!")
				  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
					.setColor(red)).then(del);
			}
		}
	}
}