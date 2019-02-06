const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	if (!message.member.roles.some(Perm.isAdmin)) {
	  	message.delete(500).catch(O_o=>{})
	  	message.channel.send(new Discord.RichEmbed()
	  	.setTitle("ERROR!")
	  	.setDescription("You are not an Admin!")
	  	.setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})})
	} else {
		if (message.member.roles.some(Perm.isAdmin)) {
				const fetched = await message.channel.fetchMessages()
				message.channel.bulkDelete(fetched)
				let delNum = "PLACEHOLDER"
				message.channel.send(new Discord.RichEmbed()
				.setTitle("ADMIN NOTICE")
				.setDescription(`I just cleaned up [${delNum}] Messages for you`)
				.setColor(color.matRed)).then(message => {message.delete(10000).catch(O_o=>{})});
				channel.send(new Discord.RichEmbed()
				.setTitle("ADMIN NOTICE")
				.setDescription(`${message.author.toString()} has CLEARED [${delNum}] Messages in ${message.channel.toString()}`)
				.setColor(color.matRed));
		} else {
				message.channel.send(new Discord.RichEmbed()
				.setTitle("CAUGHT ERROR!")
				.setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
				.setColor(color.red)).then(message => {message.delete(15000).catch(O_o=>{})});
		}
	}
}