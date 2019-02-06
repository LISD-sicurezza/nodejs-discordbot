const Discord = require("discord.js");

const Perm = require("./core_permissions.js");
const color = require('./core_colors.js')
const config = require('./config.json');

const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

module.exports.run = async (bot, message, args) => {
	await message.delete(0).catch(O_o=>{})
	var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
	if (!message.member.roles.some(Perm.isAdmin) ) {
		let title1 = "ERROR!";
		let desc1 = "You are not an Admin!";
		message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})});
	} else {
		var exit = function(){process.exit()};
		let title2 = "IMPORTANT ADMIN NOTICE"
		let desc2 = "I am FORCEFULLY Shutting down all Node.js instances of me."
		message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(color.matRed)).then(message => {message.delete(10000).catch(O_o=>{})});
		setTimeoutPromise(7000).then(exit);
		let title3 = "IMPORTANT ADMIN NOTICE";
		let desc3 = `@here ${message.author.toString()} has shutdown all instances of the DSG Bot`;
		channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(color.matRed));
	}
}