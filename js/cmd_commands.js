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
	delCmd;
	let title1 = "Member+ Commands";
	let me1 = `**${config.prefix}coinflip** - Flips a coin showing Heads or Tails`; let me2 = `**${config.prefix}invite** - Creates a 24Hours Invite`;
	let title2 = "Moderator+ Commands";
	let m1 = `**${config.prefix}kick** *[{name} {reason}]* - Kicks a User from the Discord`; let m2 = `**${config.prefix}nickname** *[{name} {nick} {reason}]* - Changes Users nickname`;
	let m3 = `**${config.prefix}delete** *[{#}]* - deletes total messages in a channel from 2-99`;
	let title3 = "Admin+ Commands";
	let a1 = `**${config.prefix}ban** *[{name} {reason}]* - Bans the User from Discord`; let a2 = `**${config.prefix}unban** *[{name} {reason}]* - unBans a User from Discord`;
	let a3 = `**${config.prefix}clear** - Clears a channel of all messages`; let a4 = `**${config.prefix}prefix** *[{prefix}]* - changes the prefix for all commands (1 long only)`;
	let a5 = `**${config.prefix}setonline** *[{put status here}]* - Changes this bots Playing Status`; let a6 = `**${config.prefix}shutdown** - Makes this BOT Shutdown`;
	message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(`${me1}\n${me2}\n`).setColor(green)).then(del60)
	message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(`${m1}\n${m2}\n${m3}\n`).setColor(purple)).then(del60)
	message.channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(`${a1}\n${a2}\n${a3}\n${a4}\n${a5}\n${a6}\n`).setColor(red)).then(del60)
}