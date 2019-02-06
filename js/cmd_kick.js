const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	if (!message.member.roles.some(Perm.isMod)) {
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
		  .setDescription("You are not a Mod or Admin!")
			.setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})})
	} else {
		let member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if (message.author.toString() === `<@${member.id}>`) {
				message.channel.send(new Discord.RichEmbed()
				.setTitle("ERROR!")
			  .setDescription(`You can't kick yourself!`)
				.setColor(color.red)).then(message => {message.delete(10000).catch(O_o=>{})})
				return;
		}
		if (!member) {
				message.channel.send(new Discord.RichEmbed()
				.setTitle("ERROR!")
			  .setDescription(`Can't find ${args[1]}. Are you typing it right? They may not be apart of the server`)
				.setColor(color.red)).then(message => {message.delete(10000).catch(O_o=>{})})
		} else {
			if (!member.kickable) {
					message.channel.send(new Discord.RichEmbed()
					.setTitle("ERROR!")
				  .setDescription(`I can't kick ${member} they have UNLIMITED POWER`)
					.setColor(color.red)).then(message => {message.delete(10000).catch(O_o=>{})})
			} else {
				let reason = args.slice(2).join(' ');
				if (!reason) {
						message.channel.send(new Discord.RichEmbed()
						.setTitle("ERROR!")
					  .setDescription(`Reason for kick is required. USAGE: !kick @Name Reason`)
						.setColor(color.red)).then(message => {message.delete(10000).catch(O_o=>{})});
				} else {
					if (member.kick) {
							let embed = new Discord.RichEmbed()
							.setTitle("MODERATION NOTICE")
						  .setDescription(`${message.author.toString()} has KICKED ${member.toString()} FOR: "${reason}"`)
							.setColor(color.matPurple);
							message.channel.send(embed).then(message => {message.delete(10000).catch(O_o=>{})});
							channel.send(embed);
							let embedDm = new Discord.RichEmbed()
							.setTitle("Sorry... you were kicked from Drunk Squad Gaming")
						  .setDescription(`${message.author.toString()} has kicked you FOR: "${reason}"`)
							.setColor(color.red);
							member.send(embedDm);
							setTimeoutPromise(2000).then((value)=>{member.kick(reason)}).catch(O_o=>{});
					} else {
							message.channel.send(new Discord.RichEmbed()
							.setTitle("ERROR!")
						  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
							.setColor(color.red)).then(message => {message.delete(15000).catch(O_o=>{})});
					}
				}
			}
		}
	}
}