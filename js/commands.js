const Discord = require("discord.js");
const Perm = require("./permissions.js");
const config = require('./config.json');
const banJS = require('./ban.js');
const util = require('util');

const bot = new Discord.Client();
const setTimeoutPromise = util.promisify(setTimeout);

const green = 0x00ff19;
const red = 0xff0008;
const pink = 0xc842f4;
const purple = 0x7f00ff;

/* deletes a message after 10secs this is used to delete notice commands then they go away*/
var del = message => {message.delete(10000).catch(O_o=>{})};
var del60 = message => {message.delete(60000).catch(O_o=>{})};

module.exports = {
	commands: async function(message, member, err, DMChannel) {
		try {
			if (message.channel.type === DMChannel) {return;} // If message is sent in DM return / Do nothing
			if (message.author.equals(bot.user)) return; // if message is from bot return / DO NOTHING
			if (!message.content.startsWith(config.prefix)) return; // if message doesn't have the prefix at the start return / DO NOTHING
			var channel = message.guild.channels.find(ch => ch.name === config.staffNotify);
			const args = message.content.slice(config.prefix.length).trim().split(/ +/g) // takes the prefix.length and splits it any words to be read so !command it can read "!" and "command"
			var delCmd = message.delete().catch(O_o=>{}); // this deletes a message instantly then .catchs an error but doesn't display the error (Must be caught after use)
			switch (args[0].toLowerCase()) { //args[0] is the first character or word AKA prefix then .toLowerCase means any prefix typed is read as lowercase (meaning you can use caps)
				case "commands":
					delCmd;
					let title1 = "Member+ Commands";
					let me1 = `**${config.prefix}coinflip** - Flips a coin showing Heads or Tails`; let me2 = `**${config.prefix}invite** - Creates a 24Hours Invite`;
					let title2 = "Moderator+ Commands";
					let m1 = `**${config.prefix}kick** *[{name} {reason}]* - Kicks a User from the Discord`; let m2 = `**${config.prefix}nickname** *[{name} {nick} {reason}]* - Changes Users nickname`;
					let m3 = `**${config.prefix}delete** *[{#}]* - deletes total messages in a channel from 2-99`;
					let title3 = "Admin+ Commands";
					let a1 = `**${config.prefix}ban** *[{name} {reason}]* - Bans the User from Discord`; let a2 = `**${config.prefix}unban** *[{name} {reason}]* - unBans a User from Discord`;
					let a3 = `**${config.prefix}clear** - Clears a channel of all messages`; let a4 = `**${config.prefix}prefix** *[{prefix}]* - changes the prefix for all commands (1 long only)`;
					let a5 = `**${config.prefix}setonline** *[{put status here}]* - Changes this bots Playing Status`; let a6 = `**${config.prefix}shutdown** - Makes this BOT Shutdown`;
					message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(`${me1}\n${me2}\n`).setColor(green)).then(del60)
					message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(`${m1}\n${m2}\n${m3}\n`).setColor(purple)).then(del60)
					message.channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(`${a1}\n${a2}\n${a3}\n${a4}\n${a5}\n${a6}\n`).setColor(red)).then(del60)
				break;
// Kicks a Member from the Discord removing any roles they have. They are able to get invited back.
				case "kick":
				if (!message.member.roles.some(Perm.isMod)) {
						delCmd;
						message.channel.send(new Discord.RichEmbed()
						.setTitle("ERROR!")
					  .setDescription("You are not a Mod or Admin!")
						.setColor(red)).then(del)
				} else {
					delCmd;
					let member = message.mentions.members.first() || message.guild.members.get(args[0]);
					if (message.author.toString() === `<@${member.id}>`) {
							message.channel.send(new Discord.RichEmbed()
							.setTitle("ERROR!")
						  .setDescription(`You can't kick yourself!`)
							.setColor(red)).then(del)
							return;
					}
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
										member.send(embedDm);
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
				break;
// Bans a Member from the Discord including their IP they will not be able to join back unless unbanned
				case "ban":
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
				break;
// Unbans a user that is banned from the Discord (Banning ip bans and prevents the user from joining back)
				case "unban":
				  let user = args[1];
          if (!message.member.roles.some(Perm.isAdmin)) {
          		delCmd;
          		message.channel.send(new Discord.RichEmbed()
          		.setTitle("ERROR!")
          	  .setDescription("You are not an Admin!")
          		.setColor(red)).then(del)
					} else {
						delCmd;
						let reason = args.slice(2).join(' ');
						if (!reason) {
								message.channel.send(new Discord.RichEmbed()
								.setTitle("ERROR!")
							  .setDescription(`Reason for unban is required. USAGE: !unban @Name Reason`)
								.setColor(red)).then(del);
						} else {
							if (user.unban) {
									let embed = new Discord.RichEmbed()
									.setTitle("ADMIN NOTICE")
								  .setDescription(`${message.author.toString()} has UNBANNED ${user.toString()} FOR: "${reason}"`)
									.setColor(red);
									message.channel.send(embed).then(del);
									channel.send(embed);
							} else {
									message.channel.send(new Discord.RichEmbed()
									.setTitle("CAUGHT ERROR!")
								  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
									.setColor(red)).then(del);
							}
						}
					}
				break;
// Delete a set number of messages from 2-99 doesn't show actual number of messages delete just how many you said to delete
				case "delete":
				  if (!message.member.roles.some(Perm.isMod)) { //Array.some() used to find roles allowed to use this command
				  		delCmd;
				  		message.channel.send(new Discord.RichEmbed()
				  		.setTitle("ERROR!")
				  	  .setDescription("You are not a Mod / Admin!")
				  		.setColor(red)).then(del)
				  } else {
				  	delCmd;
				    let deleteCount = parseInt(args[1], 10);
				  	if (!deleteCount || deleteCount < 2 || deleteCount > 99) {
				  			message.channel.send(new Discord.RichEmbed()
				  			.setTitle("ERROR!")
				  		  .setDescription(`Usage: ${config.prefix}delete [2-99]`)
				  			.setColor(red)).then(del)
				  	} else {
				  		if (message.member.roles.some(Perm.isMod)) {
				  			  const fetched = await message.channel.fetchMessages({limit: deleteCount});
				  				message.channel.send(new Discord.RichEmbed()
				  				.setTitle("ACTION NEEDED")
				  			  .setDescription(`Are you sure you want to delete [${deleteCount}] Total Messages in this Channel? \n You have 10 Seconds to decide or the command will CANCEL by itself`)
				  				.setColor(purple)).then(async sentEmbed =>{sentEmbed.react("✅"); await sentEmbed.react("❌"); message.delete(10000);});
				  				//
				  				setTimeoutPromise(10000).then(async (message, reaction, emoji) => {
				  					if (reaction.count = 2) {
				  					  message.channel.bulkDelete(fetched);
				  						message.channel.send(new Discord.RichEmbed()
				  						.setTitle("MODERATION NOTICE")
				  					  .setDescription(`DELETED [${deleteCount}] Total Messages`)
				  						.setColor(purple)).then(async sentEmbed =>{sentEmbed.react("✅"); message.delete(10000);});
				  						channel.send(new Discord.RichEmbed()
				  						.setTitle("MODERATION NOTICE")
				  					  .setDescription(`${message.author.toString()} has DELETED [${deleteCount}] Messages in ${message.channel.toString()}`)
				  						.setColor(purple))				  					
				  				  };
				  				  if (reaction.count = 1) {
				  				  		message.channel.send(new Discord.RichEmbed()
				  				  		.setTitle("MODERATION NOTICE")
				  				  	  .setDescription(`Command to delete [${deleteCount}] Total Messages has been CANCELED`)
				  				  		.setColor(purple)).then(async sentEmbed =>{sentEmbed.react("❌"); message.delete(10000);});
				  				  } else {
				  				  	// didn't react so it should give a message saying Didn't confirm canceling command
				  				  }
				  			  });
				  		} else {
				  				message.channel.send(new Discord.RichEmbed()
				  				.setTitle("CAUGHT ERROR!")
				  			  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
				  				.setColor(red)).then(del);
				  		}
				  	}
				  }
				break;
// Deletes as many messages as it can fetch doesn't seem to clear them all as there is a limit to how many it will fetch?
				case "clear":
					if (!message.member.roles.some(Perm.isAdmin)) {
				  		delCmd;
				  		message.channel.send(new Discord.RichEmbed()
				  		.setTitle("ERROR!")
				  	  .setDescription("You are not a Mod / Admin!")
				  		.setColor(red)).then(del)
					} else {
						delCmd; // trying to clear 14 day old messages will not work with Discord API need to .catch that error
						if (message.member.roles.some(Perm.isAdmin)) {
								const fetched = await message.channel.fetchMessages()
								message.channel.bulkDelete(fetched);
								message.channel.send(new Discord.RichEmbed()
								.setTitle("ADMIN NOTICE")
							  .setDescription(`I just cleaned up [PLACE HOLDER] Messages for you`)
								.setColor(red)).then(del);
								channel.send(new Discord.RichEmbed()
								.setTitle("ADMIN NOTICE")
								.setDescription(`${message.author.toString()} has CLEARED [PLACE HOLDER] Messages in ${message.channel.toString()}`)
								.setColor(red))
						} else {
								message.channel.send(new Discord.RichEmbed()
								.setTitle("CAUGHT ERROR!")
							  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
								.setColor(red)).then(del);
						}
					}
				break;
// changes the prefix in the config for the bot for the commands to use (useful for multiple bots) | probably should have the prefix in the online status so people don't forget it...
				case "prefix":
					if (!message.member.roles.some(Perm.isAdmin)) {
							delCmd;
							message.channel.send(new Discord.RichEmbed()
							.setTitle("ERROR!")
						  .setDescription("You are not a Mod / Admin!")
							.setColor(red)).then(del)
					} else {
						delCmd;
						if (args[1]) {
							let num = config.prefix.length+args[0].length+1;
							if (message.content.length != 9) {
									message.channel.send(new Discord.RichEmbed()
									.setTitle("ERROR!")
								  .setDescription("Prefix can only be 1 long")
									.setColor(red)).then(del)
							} else {
								if (message.member.roles.some(Perm.isAdmin)) {
									config.prefix = message.content[num];
									console.log(`Prefix ${config.prefix}`);
									message.channel.send(new Discord.RichEmbed()
									.setTitle("ADMIN NOTICE")
								  .setDescription(`${message.author.toString()} has change BOT Prefix to "${config.prefix}"`)
									.setColor(red)).then(del);
									channel.send(new Discord.RichEmbed()
								  .setTitle("ADMIN NOTICE")
									.setDescription(`${message.author.toString()} has change BOT Prefix to "${config.prefix}"`)
									.setColor(red));
								} else {
									message.channel.send(new Discord.RichEmbed()
									.setTitle("CAUGHT ERROR!")
								  .setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
									.setColor(red)).then(del);
								}
							}
						} else {
							delCmd;
							message.channel.send(new Discord.RichEmbed()
							.setTitle("ERROR!")
							.setDescription(`Usage: ${config.prefix}prefix !`)
							.setColor(red)).then(del)
						}
					}
				break;
// Sets what people see the bot is playing when online 
				case "setonline":
					if (!message.member.roles.some(Perm.isAdmin) ) {
							delCmd;
							message.channel.send(new Discord.RichEmbed()
							.setTitle("ERROR!")
						  .setDescription("You are not a Mod / Admin!")
							.setColor(red)).then(del)
					} else {
						if (args[1]) {
							config.online = message.content.slice(2);
							console.log(`Online ${config.online}`);
							let title1 = "ADMIN NOTICE";
							let desc1 = `Online set to "${config.online}"`;
							message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(pink)).then(del);
							let title3 = "ADMIN NOTICE";
							let desc3 = `${message.author.toString()} has changed BOT Online to "${config.online}"`;
							channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(red));
						} else {
							let title2 = "ERROR!";
							let desc2 = "Correct usage: !setplaying [stringHere]";
							message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(red)).then(del);
						}
					}
				break;
// shutsdown node which kills the bot completely
				case "shutdown":
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
				break;
// change nickname of any user should only be used for if people have bad or long nicknames or need to change the bots nickname
				case "nickname":
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
				break;
// flips a coin saying either heads or tails simple
				case "coinflip":
					delCmd;
					let heads = new Discord.RichEmbed().setDescription(`${message.author.toString()} Coin landed on HEADS`).setColor(green);
					let tails = new Discord.RichEmbed().setDescription(`${message.author.toString()} Coin landed on TAILS`).setColor(green);
					if (!message.member.roles.some(Perm.isMember)) { 
					} else {
						message.channel.send((Math.floor(Math.random() * 2) == 0) ? tails : heads).then(del);
					}
				break;
// makes a temporary invite for members only
				case "invite":
					if (!message.member.roles.some(Perm.isMember) ) {
						delCmd;
						let title1 = "ERROR!";
						let desc1 = "You are not a Member!";
						message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
					} else {
						message.reply(`${invite}`);
					}
				break;
// If no case is matched this default code is then ran MUST BE LAST
				default:message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("Unknown Command").setColor(red)).then(del);
			}
		}	catch (err) {
			console.log(err);
			message.channel.send(new Discord.RichEmbed()
			.setTitle("CAUGHT ERROR!")
			.setDescription(`${err}\n\n If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460`)
			.setColor(red)).then(del);
		}
	}
};






/*
				case "ban":
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
          						member.send(embedDM);
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
				break;*/






/*
				case "oldkick":
          if (!message.member.roles.some(Perm.isAdmin) ) { //Array.some() used to find roles allowed to use this command
            delCmd;
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription(permError).setColor(red)); // if not those roles it will throw this error
					}
					let member = message.mentions.members.first() || message.guild.members.get(args[0]); // grabs the member name
					if (!member) { // if it can't find the mentioned name throw this error
						delCmd;
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("User not found?").setColor(red));
					}
					// If we can't kick the member then they have
					if (!member.kickable) { // KICKABLE not defined?
						delCmd;
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("I can't kick this User").setColor(red));
					}
					let channel = member.guild.channels.find(ch => ch.name === 'mod-action'); // sets channel to the channel we want to send the moderation log to
					let reason = args.slice(2).join(' '); // Takes the reason and slices it from the rest of the characters
					let goodbye = member.send(new Discord.RichEmbed().setTitle("You were kicked from Drunk Squad Gaming").setDescription(`${message.author.toString()} KICKED YOU FOR "${reason}"`).setColor(red));
					if (!reason) reason = "No reason provided!"; // Default reason if no reason is provided
					if (member.kick) {
						//this scope runs if you try to kick someone but can't anyways. it should only run if KICKED
						delCmd;
						goodbye;
						message.channel.send(new Discord.RichEmbed().setTitle("Moderation Log").setDescription(`${message.author.toString()} KICKED ${member.toString()} FOR "${reason}"`).setColor(green)).then(message => {message.delete(10000).catch(O_o=>{})});
						channel.send(new Discord.RichEmbed().setTitle("Moderation Log").setDescription(`${message.author.toString()} KICKED ${member.toString()} FOR "${reason}"`).setColor(green));
					}
					setTimeoutPromise(2000).then((value)=>{member.kick(reason)});
					//await member.kick(reason);
				break; //break is the same as defining the scope of the case if you don't break it will continue executing code until next break!
case "olddelete":
  //const deleteCount = parseInt(args[0], 10); // parseInt parses a string into an interger,
	if (!deleteCount || deleteCount < 2 ) { //|| deleteCount > 100) {
		message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("Provide a Number between 2 and 99").setColor(red));
	}
	const fetched = await message.channel.fetchMessages({limit: deleteCount});
	let msgTotal = 0;
	message.channel.bulkDelete(fetched)
	message.channel.send(new Discord.RichEmbed().setTitle("That was some cleaning..").setDescription(`DELETED [${msgTotal}] Total Messages`).setColor(green)).then(message => {message.delete(10000).catch(O_o=>{})});
break;*/