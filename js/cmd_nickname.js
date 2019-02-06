const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	let nick = args.slice(2).join(' ');
	//let reason = args.slice(3).join(' ')
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
	if (!message.member.roles.some(Perm.isAdmin) ) {
		let title1 = "ERROR!";
		let desc1 = "You are not an Admin!";
		message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})});
	} else {
		let title2 = "MODERATION NOTICE";
		let desc2 = `Setting ${member} Nickname to ${nick}`;
		message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(color.matPurple)).then(message => {message.delete(10000).catch(O_o=>{})});
		let title3 = "MODERATION NOTICE";
		let desc3 = `${message.author.toString()} has set ${member} Nickname to ${nick}`;
	  channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(color.matPurple));
		member.setNickname(nick);
	}
}