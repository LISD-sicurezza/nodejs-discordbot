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
mExport.ban = async function(message, member, err, DMChannel) { try {
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
	var delCmd = message.delete().catch(O_o=>{});
	if (message.channel.type === DMChannel) {return;}
	if (!message.member.roles.some(Perm.isAdmin)) {
			delCmd;
			message.channel.send(new Discord.RichEmbed()
			.setTitle("ERROR!")
		  .setDescription("You are not an Admin!")
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
							member.send(embedDM);
							setTimeoutPromise(2000).then((value)=>{member.kick(reason)}).catch(O_o=>{});
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
}	catch (err) {
		message.channel.send(new Discord.RichEmbed()
		.setTitle("CAUGHT ERROR!")
	  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
		.setColor(red)).then(del);
}};

/*
if (!message.member.roles.some(Perm.isAdmin) ) {
				  	delCmd;
				  	let title1 = "ERROR!";
				  	let desc1 = "You are not an Admin!";
				  	message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
					} else {
						delCmd;
						let member = message.mentions.members.first() || message.guild.members.get(args[0]);
						if (!member) {
							let title2 = "ERROR!";
							let desc2 = `Can't find ${args[1]}. Are you typing it right? They may not be apart of the server`;
							message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(red)).then(del);
						} else {
							if (!member.bannable) {
								let title3 = "ERROR!";
								let desc3 = `I can't ban ${member} they have UNLIMITED POWER`;
								message.channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(red)).then(del);
							} else {
								let reason = args.slice(2).join(' ');
								if (!reason) reason = "No reason provided!";
								if (member.ban) {
									let title4 = "ADMIN NOTICE";
									let desc4 = `${message.author.toString()} has BANNED ${member.toString()} FOR: "${reason}"`;
									message.channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(red)).then(del);
									channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(red));
									let title5 = "Sorry... you were banned from Drunk Squad Gaming";
									let desc5 = `${message.author.toString()} has banned you FOR: "${reason}" If you believe this is an Error contact a Server Staff @Blaze#0666`;
									member.send(new Discord.RichEmbed().setTitle(title5).setDescription(desc5).setColor(red))
									setTimeoutPromise(2000).then((value)=>{member.ban(reason)}); // this bans after 2 seconds
								} else {
									let title6 = "ERROR!";
									let desc6 = "Well... this shouldn't happen at all meaning you really broke something.";
									message.channel.send(new Discord.RichEmbed().setTitle(title6).setDescription(desc6).setColor(red)).then(del);
								}
							}
						}
					}*/