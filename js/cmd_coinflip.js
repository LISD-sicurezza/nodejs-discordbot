const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	let heads = new Discord.RichEmbed().setDescription(`${message.author.toString()} Coin landed on HEADS`).setColor(color.matGreen);
	let tails = new Discord.RichEmbed().setDescription(`${message.author.toString()} Coin landed on TAILS`).setColor(color.matGreen);
	if (!message.member.roles.some(Perm.isMember)) {
		let title1 = "ERROR!";
		let desc1 = "You are not a Member!";
		message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})});
	} else {
		message.channel.send((Math.floor(Math.random() * 2) == 0) ? tails : heads).then(message => {message.delete(10000).catch(O_o=>{})});
	}
}