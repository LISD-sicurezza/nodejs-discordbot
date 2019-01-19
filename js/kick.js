const Discord = require("discord.js");
const Perm = require("./permissions.js");
const config = require('./config.json');
const util = require('util');
const bot = new Discord.Client();
const setTimeoutPromise = util.promisify(setTimeout);
const red = 0xff0008;

var del = message => {message.delete(10000).catch(O_o=>{})};
var del60 = message => {message.delete(60000).catch(O_o=>{})};

var mExport = module.exports = {};
mExport.kick = async function(message, member, err, DMChannel) { try {
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
	var delCmd = message.delete().catch(O_o=>{});
	if (message.channel.type === DMChannel) {return;}
	if (!message.member.roles.some(Perm.isMod)) {
			delCmd;
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
		  .setDescription("You are not a Mod or Admin!")
			.setColor(red)).then(del)
	} else {
		delCmd;
		let member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if (!member) {
				message.channel.send(new Discord.RichEmbed()
				.setTitle("ERROR!")
			  .setDescription(`Can't find ${args[1]}. Are you typing it right? They may not be apart of the server`)
				.setColor(red)).then(del)
		} else {
			if (!member.kickable) {
					message.channel.send(new Discord.RichEmbed()
					.setTitle("ERROR!")
				  .setDescription(`I can't kick ${member} they have UNLIMITED POWER`)
					.setColor(red)).then(del)
			} else {
				let reason = args.slice(2).join(' ');
				if (!reason) {
						message.channel.send(new Discord.RichEmbed()
						.setTitle("ERROR!")
					  .setDescription(`Reason for kick is required. USAGE: !kick @Name Reason`)
						.setColor(red)).then(del);
				} else {
					if (member.kick) {
							let embed = new Discord.RichEmbed()
							.setTitle("MODERATION NOTICE")
						  .setDescription(`${message.author.toString()} has KICKED ${member.toString()} FOR: "${reason}"`)
							.setColor(red);
							message.channel.send(embed).then(del);
							channel.send(embed);
							let embedDm = new Discord.RichEmbed()
							.setTitle("Sorry... you were kicked from Drunk Squad Gaming")
						  .setDescription(`${message.author.toString()} has kicked you FOR: "${reason}"`)
							.setColor(red);
							member.send(embedDM);
							setTimeoutPromise(2000).then((value)=>{member.kick(reason)}).catch(O_o=>{});
					} else {
							message.channel.send(new Discord.RichEmbed()
							.setTitle("ERROR!")
						  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
							.setColor(red)).then(del);
					}
				}
			}
		}
	}
} catch (err) {
		message.channel.send(new Discord.RichEmbed()
		.setTitle("CAUGHT ERROR!")
	  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
		.setColor(red)).then(del);
}};


/*
          if (!message.member.roles.some(Perm.isMod) ) { //Array.some() used to find roles allowed to use this command
				  	delCmd;
				  	let title1 = "ERROR!";
				  	let desc1 = "You are not a Mod or Admin!";
				  	message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
					} else {
						delCmd;
						let member = message.mentions.members.first() || message.guild.members.get(args[0]);
						if (!member) {
							let title2 = "ERROR!";
							let desc2 = `Can't find ${args[1]}. Are you typing it right? They may not be apart of the server`;
							message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(red)).then(del);
						} else {
							if (!member.kickable) {
								let title3 = "ERROR!";
								let desc3 = `I can't kick ${member} they have UNLIMITED POWER`;
								message.channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(red)).then(del);
							} else {
								let reason = args.slice(2).join(' ');
								if (!reason) reason = "No reason provided!";
								if (member.kick) {
									let title4 = "MODERATION NOTICE";
									let desc4 = `${message.author.toString()} has KICKED ${member.toString()} FOR: "${reason}"`;
									message.channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(purple)).then(del);
									channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(purple));
									let title5 = "Sorry... you were kicked from Drunk Squad Gaming";
									let desc5 = `${message.author.toString()} has kicked you FOR: "${reason}"`;
									member.send(new Discord.RichEmbed().setTitle(title5).setDescription(desc5).setColor(purple))
									setTimeoutPromise(2000).then((value)=>{member.kick(reason)}).catch(O_o=>{}); // this kicks after 2 seconds
									catch(O_o=>{})
								} else {
									let title = "ERROR!";
									let desc = "Well... this shouldn't happen at all meaning you really broke something.";
									message.channel.send(new Discord.RichEmbed().setTitle(title).setDescription(desc).setColor(red)).then(del);
								}
							}
						}
					}*/