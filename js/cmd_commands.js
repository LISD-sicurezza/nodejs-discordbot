const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	let title1 = "Member+ Commands";
	let me1 = `**${config.prefix}coinflip** - Flips a coin showing Heads or Tails`; let me2 = `**${config.prefix}invite** - Creates a 24Hours Invite`;
	let title2 = "Moderator+ Commands";
	let m1 = `**${config.prefix}kick** *[{name} {reason}]* - Kicks a User from the Discord`; let m2 = `**${config.prefix}nickname** *[{name} {nick} {reason}]* - Changes Users nickname`;
	let m3 = `**${config.prefix}delete** *[{#}]* - deletes total messages in a channel from 2-99`;
	let title3 = "Admin+ Commands";
	let a1 = `**${config.prefix}ban** *[{name} {reason}]* - Bans the User from Discord`; let a2 = `**${config.prefix}unban** *[{name} {reason}]* - unBans a User from Discord`;
	let a3 = `**${config.prefix}clear** - Clears a channel of all messages`; let a4 = `**${config.prefix}prefix** *[{prefix}]* - changes the prefix for all commands (1 long only)`;
	let a5 = `**${config.prefix}setonline** *[{put status here}]* - Changes this bots Playing Status`; let a6 = `**${config.prefix}shutdown** - Makes this BOT Shutdown`;
	message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(`${me1}\n${me2}\n`).setColor(color.matGreen)).then(message => {message.delete(25000).catch(O_o=>{})})
	message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(`${m1}\n${m2}\n${m3}\n`).setColor(color.matPurple)).then(message => {message.delete(25000).catch(O_o=>{})})
	message.channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(`${a1}\n${a2}\n${a3}\n${a4}\n${a5}\n${a6}\n`).setColor(color.matRed)).then(message => {message.delete(25000).catch(O_o=>{})})
}