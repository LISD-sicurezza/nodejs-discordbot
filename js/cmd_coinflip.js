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
	let heads = new Discord.RichEmbed().setDescription(`${message.author.toString()} Coin landed on HEADS`).setColor(green);
	let tails = new Discord.RichEmbed().setDescription(`${message.author.toString()} Coin landed on TAILS`).setColor(green);
	if (!message.member.roles.some(Perm.isMember)) { 
	} else {
		message.channel.send((Math.floor(Math.random() * 2) == 0) ? tails : heads).then(del);
	}
}