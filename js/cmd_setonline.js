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
	if (!message.member.roles.some(Perm.isAdmin) ) {
			delCmd;
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
		  .setDescription("You are not a Mod / Admin!")
			.setColor(red)).then(del)
	} else {
		if (args[1]) {
			config.online = message.content.slice(2);
			console.log(`Online ${config.online}`);
			let title1 = "ADMIN NOTICE";
			let desc1 = `Online set to "${config.online}"`;
			message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(pink)).then(del);
			let title3 = "ADMIN NOTICE";
			let desc3 = `${message.author.toString()} has changed BOT Online to "${config.online}"`;
			channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(red));
		} else {
			let title2 = "ERROR!";
			let desc2 = "Correct usage: !setplaying [stringHere]";
			message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(red)).then(del);
		}
	}
}