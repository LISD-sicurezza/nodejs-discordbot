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
	if (!message.member.roles.some(Perm.isAdmin)) {
	  	delCmd;
	  	message.channel.send(new Discord.RichEmbed()
	  	.setTitle("ERROR!")
	  	.setDescription("You are not an Admin!")
	  	.setColor(red)).then(del)
	} else {
		delCmd; // trying to clear 14 day old messages will not work with Discord API need to .catch that error using process.on it is currently temp handled
		if (message.member.roles.some(Perm.isAdmin)) {
				const fetched = await message.channel.fetchMessages()
				message.channel.bulkDelete(fetched)
				let delNum = "PLACEHOLDER"
				message.channel.send(new Discord.RichEmbed()
				.setTitle("ADMIN NOTICE")
				.setDescription(`I just cleaned up [${delNum}] Messages for you`)
				.setColor(red)).then(del);
				channel.send(new Discord.RichEmbed()
				.setTitle("ADMIN NOTICE")
				.setDescription(`${message.author.toString()} has CLEARED [${delNum}] Messages in ${message.channel.toString()}`)
				.setColor(red));
		} else {
				message.channel.send(new Discord.RichEmbed()
				.setTitle("CAUGHT ERROR!")
				.setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
				.setColor(red)).then(del);
		}
	}
}