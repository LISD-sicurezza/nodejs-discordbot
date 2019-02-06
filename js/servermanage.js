const Discord = require("discord.js");
const Perm = require("./permissions.js");
const config = require('./config.json');
const util = require('util');

const bot = new Discord.Client();
const setTimeoutPromise = util.promisify(setTimeout);

const green = 0x00ff19;
const red = 0xff0008;
const pink = 0xc842f4;
const purple = 0x7f00ff;

module.exports = {
	onJoin: (member, send, message, channels, guild) => {
		let roleGuest = member.guild.roles.find(r => r.name === config.joinRole);
		let channel = member.guild.channels.find(ch => ch.name === config.joinNotify);
			member.send(new Discord.RichEmbed()
			.setTitle("Welcome to Drunk Squad Gaming!")
		  .setDescription(`I'm a bot in development if you see this we haven't gotten this far on added a join message! Until then welcome!`))
		  .setColor(green);
		  channel.send(new Discord.RichEmbed()
		  .setTitle("New Guest has arrived!")
		  .setDescription(`${member} Just joined the server there are [PLACE HOLDER USERS]`))
		  .setColor(green);
		  member.addRole(roleGuest);
	}
}