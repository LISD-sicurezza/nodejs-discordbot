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
	if (!message.member.roles.some(Perm.isAdmin)) {
	    delCmd;
	    message.channel.send(new Discord.RichEmbed()
	    .setTitle("ERROR!")
	    .setDescription("You are not an Admin!")
	    .setColor(red)).then(del)
	} else {
	  delCmd;
	  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
	  if (message.author.toString() === `<@${member.id}>`) {
	    	message.channel.send(new Discord.RichEmbed()
	      .setTitle("ERROR!")
	      .setDescription(`You can't ban yourself!`)
	      .setColor(red)).then(del)
	      return;
	  }
	  if (!member) {
	    message.channel.send(new Discord.RichEmbed()
	    .setTitle("ERROR!")
	    .setDescription(`Can't find ${args[1]}. Are you typing it right? They may not be apart of the server`)
	    .setColor(red)).then(del)
	  } else {
	    if (!member.bannable) {
	        message.channel.send(new Discord.RichEmbed()
	        .setTitle("ERROR!")
	        .setDescription(`I can't ban ${member} they have UNLIMITED POWER`)
	        .setColor(red)).then(del)
	    } else {
	      let reason = args.slice(2).join(' ');
	      if (!reason) {
	        	message.channel.send(new Discord.RichEmbed()
	          .setTitle("ERROR!")
	          .setDescription(`Reason for ban is required. USAGE: !ban @Name Reason`)
	          .setColor(red)).then(del);
	      } else {
	        if (member.ban) {
	            let embed = new Discord.RichEmbed()
	          	.setTitle("ADMIN NOTICE")
	          	.setDescription(`${message.author.toString()} has BANNED ${member.toString()} FOR: "${reason}"`)
	          	.setColor(red);
	          	message.channel.send(embed).then(del);
	          	channel.send(embed);
	          	let embedDm = new Discord.RichEmbed()
	          	.setTitle("Sorry... you were kicked from Drunk Squad Gaming")
	          	.setDescription(`${message.author.toString()} has BANNED you FOR: "${reason}"`)
	          	.setColor(red);
	          	member.send(embedDm);
	          	setTimeoutPromise(2000).then((value)=>{member.ban(reason)}).catch(O_o=>{});
	        } else {
	          message.channel.send(new Discord.RichEmbed()
	          .setTitle("CAUGHT ERROR!")
	          .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
	          .setColor(red)).then(del);
	        }
	      }
	    }
	  }
	}
}