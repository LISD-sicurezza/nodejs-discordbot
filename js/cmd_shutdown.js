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

module.exports.run = async (bot, message, args) => {
 var delCmd = message.delete().catch(O_o=>{});
 var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
 if (!message.member.roles.some(Perm.isAdmin) ) {
 	delCmd;
 	let title1 = "ERROR!";
 	let desc1 = "You are not an Admin!";
 	message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
 } else {
 	var exit = function(){process.exit()};
 	let title2 = "IMPORTANT ADMIN NOTICE"
 	let desc2 = "I am Shutting down all Node.js instances of me."
 	message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(red)).then(del).then(exit);
 	let title3 = "IMPORTANT ADMIN NOTICE";
 	let desc3 = `@here ${message.author.toString()} has shutdown all instances of the DSG Bot`;
 	channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(red));
 }
}