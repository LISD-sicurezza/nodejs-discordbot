const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	if (!message.member.roles.some(Perm.isAdmin)) {
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
		  .setDescription("You are not a Mod / Admin!")
			.setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})})
	} else {
		if (args[1]) {
			let num = config.prefix.length+args[0].length+1;
			if (message.content.length != 9) {
					message.channel.send(new Discord.RichEmbed()
					.setTitle("ERROR!")
				  .setDescription("Prefix can only be 1 long")
					.setColor(color.red)).then(message => {message.delete(10000).catch(O_o=>{})})
			} else {
				if (message.member.roles.some(Perm.isAdmin)) {
					config.prefix = message.content[num];
					bot.user.setActivity(`${config.prefix}commands`);
					console.log(`Prefix ${config.prefix}`);
					message.channel.send(new Discord.RichEmbed()
					.setTitle("ADMIN NOTICE")
				  .setDescription(`${message.author.toString()} has change BOT Prefix to "${config.prefix}"`)
					.setColor(color.matRed)).then(message => {message.delete(10000).catch(O_o=>{})});
					channel.send(new Discord.RichEmbed()
				  .setTitle("ADMIN NOTICE")
					.setDescription(`${message.author.toString()} has change BOT Prefix to "${config.prefix}"`)
					.setColor(color.matRed));
				} else {
					message.channel.send(new Discord.RichEmbed()
					.setTitle("CAUGHT ERROR!")
				  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
					.setColor(color.red)).then(message => {message.delete(15000).catch(O_o=>{})});
				}
			}
		} else {
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
			.setDescription(`Usage: ${config.prefix}prefix !`)
			.setColor(color.red)).then(message => {message.delete(10000).catch(O_o=>{})})
		}
	}
}