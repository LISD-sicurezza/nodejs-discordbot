const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	if (!message.member.roles.some(Perm.isAdmin) ) {
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
		  .setDescription("You are not a Mod / Admin!")
			.setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})})
	} else {
		if (args[1]) {
			config.online = message.content.slice(2);
			console.log(`Online ${config.online}`);
			let title1 = "ADMIN NOTICE";
			let desc1 = `Online set to "${config.online}"`;
			message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(color.matRed)).then(message => {message.delete(10000).catch(O_o=>{})});
			let title3 = "ADMIN NOTICE";
			let desc3 = `${message.author.toString()} has changed BOT Online to "${config.online}"`;
			channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(color.matRed));
		} else {
			let title2 = "ERROR!";
			let desc2 = "Correct usage: !setplaying [stringHere]";
			message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(color.red)).then(message => {message.delete(10000).catch(O_o=>{})});
		}
	}
}