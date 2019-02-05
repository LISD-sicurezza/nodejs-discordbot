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
		let nick = args.slice(2).join(' ');
		//let reason = args.slice(3).join(' ')
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if (!message.member.roles.some(Perm.isAdmin) ) {
			delCmd;
			let title1 = "ERROR!";
			let desc1 = "You are not an Admin!";
			message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
		} else {
			delCmd;
			let title2 = "MODERATION NOTICE";
			let desc2 = `Setting ${member} Nickname to ${nick}`;
			message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(purple)).then(del);
			let title3 = "MODERATION NOTICE";
			let desc3 = `${message.author.toString()} has set ${member} Nickname to ${nick}`;
		  channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(purple));
			member.setNickname(nick);
		}
}