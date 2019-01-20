const Discord = require("discord.js");
const Perm = require("./permissions.js");
const config = require('./config.json');
const util = require('util');
const bot = new Discord.Client();
const setTimeoutPromise = util.promisify(setTimeout);
const red = 0xff0008;

var delCmd = message => {message.delete().catch(O_o=>{})};
var del = message => {message.delete(10000).catch(O_o=>{})};
var del60 = message => {message.delete(60000).catch(O_o=>{})};

// function is running when invoked in commands however properties are lost


var mExport = module.exports = {};
mExport.banF = async function(message, member, err) {
	console.log("test1");
	const channel = message =>{message.guild.channels.find(ch => ch.name === 'mod-action')};
	const args = message =>{param.message.content.slice(config.prefix.length).trim().split(/ +/g)};
	if ((message, member, channel) =>{!message.member.roles.some(Perm.isAdmin)}) {
			console.log("test2");
	    delCmd;
	    message =>{message.channel.send(new Discord.RichEmbed()
	    .setTitle("ERROR!")
	    .setDescription("You are not an Admin!")
	    .setColor(red)).then(del)}
	} else {
		console.log("test3");
	  delCmd;
	  let member = message =>{message.mentions.members.first() || message.guild.members.get(args[0])};
	  if (message =>{message.author.toString() === `<@${member.id}>`}) {
	    	message =>{message.channel.send(new Discord.RichEmbed()
	      .setTitle("ERROR!")
	      .setDescription(`You can't ban yourself!`)
	      .setColor(red)).then(del)}
	      return;
	  }
	  if (!member) {
	    message =>{message.channel.send(new Discord.RichEmbed()
	    .setTitle("ERROR!")
	    .setDescription(`Can't find ${args[1]}. Are you typing it right? They may not be apart of the server`)
	    .setColor(red)).then(del)}
	  } else {
	    if (!member.bannable) {
	        message =>{message.channel.send(new Discord.RichEmbed()
	        .setTitle("ERROR!")
	        .setDescription(`I can't ban ${member} they have UNLIMITED POWER`)
	        .setColor(red)).then(del)}
	    } else {
	      let reason = args.slice(2).join(' ');
	      if (!reason) {
	        	message =>{message.channel.send(new Discord.RichEmbed()
	          .setTitle("ERROR!")
	          .setDescription(`Reason for ban is required. USAGE: !ban @Name Reason`)
	          .setColor(red)).then(del)};
	      } else {
	        if (member.ban) {
	            let embed = new Discord.RichEmbed()
	          	.setTitle("ADMIN NOTICE")
	          	.setDescription(`${message.author.toString()} has BANNED ${member.toString()} FOR: "${reason}"`)
	          	.setColor(red);
	          	message =>{message.channel.send(embed).then(del)};
	          	message =>{channel.send(embed)};
	          	let embedDm = new Discord.RichEmbed()
	          	.setTitle("Sorry... you were kicked from Drunk Squad Gaming")
	          	.setDescription(`${message.author.toString()} has BANNED you FOR: "${reason}"`)
	          	.setColor(red);
	          	message =>{member.send(embedDM)};
	          	setTimeoutPromise(2000).then((value)=>{member.ban(reason)}).catch(O_o=>{});
	        } else {
	          message =>{message.channel.send(new Discord.RichEmbed()
	          .setTitle("CAUGHT ERROR!")
	          .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
	          .setColor(red)).then(del)};
	        }
	      }
	    }
	  }
	}
};
