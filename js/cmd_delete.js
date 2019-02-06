const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	if (!message.member.roles.some(Perm.isMod)) { //Array.some() used to find roles allowed to use this command
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
		  .setDescription("You are not a Mod / Admin!")
			.setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})})
	} else {
	  let deleteCount = parseInt(args[1], 10);
		if (!deleteCount || deleteCount < 2 || deleteCount > 99) {
				message.channel.send(new Discord.RichEmbed()
				.setTitle("ERROR!")
			  .setDescription(`Usage: ${config.prefix}delete [2-99]`)
				.setColor(color.red)).then(message => {message.delete(10000).catch(O_o=>{})})
		} else {
			if (message.member.roles.some(Perm.isMod)) {
					const fetched = await message.channel.fetchMessages({limit: deleteCount});
				  message.channel.bulkDelete(fetched);
				  let delNum = "PLACEHOLDER"
					message.channel.send(new Discord.RichEmbed()
					.setTitle("MODERATION NOTICE")
				  .setDescription(`DELETED [${delNum}] Total Messages`)
					.setColor(color.matPurple)).then(message => {message.delete(10000).catch(O_o=>{})})
					channel.send(new Discord.RichEmbed()
					.setTitle("MODERATION NOTICE")
				  .setDescription(`${message.author.toString()} has DELETED [${delNum}] Messages in ${message.channel.toString()}`)
					.setColor(color.matPurple))
			} else {
					message.channel.send(new Discord.RichEmbed()
					.setTitle("CAUGHT ERROR!")
				  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
					.setColor(color.red)).then(message => {message.delete(15000).catch(O_o=>{})});
			}
		}
	}
}