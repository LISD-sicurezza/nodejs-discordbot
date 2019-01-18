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

console.log(`Prefix ${config.prefix}`);
console.log(`Online ${config.online}`);

/* deletes a message after 10secs this is used to delete notice commands then they go away*/
var del = message => {message.delete(10000).catch(O_o=>{})};
module.exports = {
	commands: async message => {
		try {
			if (message.author.equals(bot.user)) return; // if message is from bot return / DO NOTHING
			if (!message.content.startsWith(config.prefix)) return; // if message doesn't have the prefix at the start return / DO NOTHING
			const args = message.content.slice(config.prefix.length).trim().split(/ +/g) // takes the prefix.length and splits it any words to be read so !command it can read "!" and "command"
			var delCmd = message.delete().catch(O_o=>{}); // this deletes a message instantly then .catchs an error but doesn't display the error (Must be caught after use)
			switch (args[0].toLowerCase()) { //args[0] is the first character or word AKA prefix then .toLowerCase means any prefix typed is read as lowercase (meaning you can use caps)
// Kicks a Member from the Discord removing any roles they have. They are able to get invited back.
				case "kick":
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
								let channel = member.guild.channels.find(ch => ch.name === 'mod-action')
								let reason = args.slice(2).join(' ');
								if (!reason) reason = "No reason provided!";
								if (member.kick) {
									let title4 = "MODERATION NOTICE";
									let desc4 = `${message.author.toString()} has KICKED ${member.toString()} FOR: "${reason}"`;
									message.channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(purple)).then(del);
									channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(purple)).then(del);
									let title5 = "Sorry... you were kicked from Drunk Squad Gaming";
									let desc5 = `${message.author.toString()} has kicked you FOR: "${reason}"`;
									member.send(new Discord.RichEmbed().setTitle(title5).setDescription(desc5).setColor(purple))
									setTimeoutPromise(2000).then((value)=>{member.kick(reason)}); // this kicks after 2 seconds
								} else {
									let title6 = "ERROR!";
									let desc6 = "Well... this shouldn't happen at all meaning you really broke something.";
									message.channel.send(new Discord.RichEmbed().setTitle(title6).setDescription(desc6).setColor(red)).then(del);
								}
							}
						}
					}
				break;
// Bans a Member from the Discord including their IP they will not be able to join back unless unbanned
				case "ban":
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
								let channel = member.guild.channels.find(ch => ch.name === 'mod-action')
								let reason = args.slice(2).join(' ');
								if (!reason) reason = "No reason provided!";
								if (member.ban) {
									let title4 = "MODERATION NOTICE";
									let desc4 = `${message.author.toString()} has BANNED ${member.toString()} FOR: "${reason}"`;
									message.channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(purple)).then(del);
									channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(purple)).then(del);
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
					}
				break;
// Unbans a user that is banned from the Discord (Banning ip bans and prevents the user from joining back)
				case "unban":
				  let user = args[1];
          if (!message.member.roles.some(Perm.isAdmin) ) {
				  	delCmd;
				  	let title1 = "ERROR!";
				  	let desc1 = "You are not an Admin!";
				  	message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
					} else {
						let reason = args.slice(2).join(' ');
						if (!reason) reason = "No reason provided!";
						if (user.unban) {
							let title4 = "MODERATION NOTICE";
							let desc4 = `${message.author.toString()} has UNBANNED ${member.toString()} FOR: "${reason}"`;
							message.channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(green)).then(del);
							//channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(green)).then(del);
							setTimeoutPromise(2000).then((value)=>{user.unban(reason)}); // this kicks after 2 seconds
						} else {
							let title3 = "ERROR!";
							let desc3 = `I can't unban ${user} ?`;
							message.channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(red)).then(del);
						}
					}
				break;
// Delete a set number of messages from 2-99 doesn't show actual number of messages delete just how many you said to delete
				case "delete":
				  if (!message.member.roles.some(Perm.isMod) ) { //Array.some() used to find roles allowed to use this command
				  	delCmd;
				  	let title1 = "ERROR!";
				  	let desc1 = "You are not a Mod or Admin!";
				  	message.channel.bulkDelete(fetched);
				  	message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
				  } else {
				    var deleteCount = parseInt(args[1], 10);
				  	if (!deleteCount || deleteCount < 2 || deleteCount > 99) {
				  		let title2 = "ERROR!";
				  		let desc2 = `Usage: ${prefix}delete [2-99]`;
				  		message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(red)).then(del);
				  	} else {
				  		const fetched = await message.channel.fetchMessages({limit: deleteCount});
				  		message.channel.bulkDelete(fetched);
				  		let title3 = "That was some cleaning..";
				  		let desc3 = `DELETED [${deleteCount}] Total Messages`;
				  		message.channel.send(new Discord.RichEmbed().setTitle(title3).setDescription(desc3).setColor(green)).then(del);
				  		let title4 = "MODERATION NOTICE";
				  		let desc4 = `${message.author.toString()} has DELETED [${deleteCount}] Messages in ${message.channel.toString()}`;
				  		channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(purple)).then(del);
				  	}
				  }
				break;
// Deletes as many messages as it can fetch doesn't seem to clear them all as there is a limit to how many it will fetch?
				case "clear":
				  let channel = member.guild.channels.find(ch => ch.name === 'mod-action')
					if (!message.member.roles.some(Perm.isAdmin) ) {
						delCmd;
						let title1 = "ERROR!";
						let desc1 = "You are not an Admin!";
						message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
					} else {
						delCmd;
						const fetched = await message.channel.fetchMessages()
						message.channel.bulkDelete(fetched);
						let title2 = "Now that was a mess..";
						let desc2 = `Cleared all messages I was able to fetch!`;
						message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(green)).then(del);
						let title4 = "MODERATION NOTICE";
						let desc4 = `${message.author.toString()} has CLEARED ${message.channel.toString()}`;
						channel.send(new Discord.RichEmbed().setTitle(title4).setDescription(desc4).setColor(purple)).then(del);
					}
				break;
// changes the prefix in the config for the bot for the commands to use (useful for multiple bots) | probably should have the prefix in the online status so people don't forget it...
				case "prefix":
					if (!message.member.roles.some(Perm.isAdmin) ) {
						delCmd;
						let title1 = "ERROR!";
						let desc1 = "You are not an Admin!";
						message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
					} else {
						if (args[1]) {
							let num = config.prefix.length+args[0].length+1;
							if (message.content.length != 9) {
								message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Prefix can only be 1 long").setColor(red)).then(del);
							} else {
								config.prefix = message.content[num];
								console.log(`Prefix ${config.prefix}`);
								let title1 = "MODERATION NOTICE";
								let desc1 = `Prefix set to ${config.prefix}`;
								message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(green)).then(del);
							}
						} else {
							message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Correct usage: !prefix !").setColor(red)).then(del);
						}
					}
				break;
// Sets what people see the bot is playing when online 
				case "setonline":
					if (!message.member.roles.some(Perm.isAdmin) ) {
						delCmd;
						let title1 = "ERROR!";
						let desc1 = "You are not an Admin!";
						message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
					} else {
						if (args[1]) {
							config.online = message.content.slice(2);
							console.log(`Online ${config.online}`);
							let title1 = "MODERATION NOTICE";
							let desc1 = `Online set to "${config.online}"`;
							message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(green)).then(del);
						} else {
							let title2 = "ERROR!";
							let desc2 = "Correct usage: !setplaying [stringHere]";
							message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(green)).then(del);
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
						let title2 = "BOT NOTICE"
						let desc2 = "I am Shutting down all Node.js instances of me."
						message.channel.send(new Discord.RichEmbed().setTitle(title2).setDescription(desc2).setColor(green)).then(del).then(exit);
					}
				break;
// change nickname of any user should only be used for if people have bad or long nicknames or need to change the bots nickname
				case "nickname":
					if (!message.member.roles.some(Perm.isAdmin) ) {
						delCmd;
						let title1 = "ERROR!";
						let desc1 = "You are not an Admin!";
						message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(desc1).setColor(red)).then(del);
					} else {
						// add code here on who you want to change nicknames for the discord and a reason why like the !kick
					}
				break;
// flips a coin saying either heads or tails simple
				case "coinflip":
					let heads = new Discord.RichEmbed().setDescription(`${message.author.toString()} Coin landed on HEADS`).setColor(green).then(del);
					let tails = new Discord.RichEmbed().setDescription(`${message.author.toString()} Coin landed on TAILS`).setColor(green).then(del);
					message.channel.send((Math.floor(Math.random() * 2) == 0) ? tails : heads);
				break;
// If no case is matched this default code is then ran MUST BE LAST
				default:message.channel.send(new Discord.RichEmbed().setTitle("ERROR! Unknown Command").setColor(red)).then(del);
			}
		}
// Catches any errors thrown in any of the commands that aren't handled then displays them here.
		catch(err){
			let title1 = "ERROR!";
			let desc1 = "Do you have Permission to run this command? You can't run Admin Commands in Direct Message"
			let desc2 = "If this error persists then contact @Blaze#0666 or @Luke SwagWalker#1460"
			console.log(err)
			message.channel.send(new Discord.RichEmbed().setTitle(title1).setDescription(`${err}\n${desc}\n\n${desc2}`).setColor(red)).then(del);
		}
	}
};














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