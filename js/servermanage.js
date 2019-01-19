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
	onJoin: function(message, member){
		let roleGuest = message.guild.roles.get(r => r.name === 'Guest');
		let channel = message.guild.channels.find(ch => ch.name === 'user-join-leave');
		let title1 = "Welcome to Drunk Squad Gaming!";
		let desc1 = "Just a place holder";
		message.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red));
		let title2 = "New contender has arrived!";
		let desc2 = `${member} Just joined the server there are [PLACE HOLDER USERS]`;
		channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(red));
		member.addRole(roleGuest);
	},
	onMessage: function(){
		// add moderation checks
	}
}