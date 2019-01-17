const Discord = require("discord.js");
const bot = new Discord.Client();
var prefix = "1"
var permError = "You do not have permission to run this Command!";

const green = 0x00ff19;
const red = 0xff0008;
const pink = 0xc842f4;
const purple = 0x7f00ff;

module.exports = {
	staff: async message => {
		try {
			if (message.author.equals(bot.user)) return; // if message is from bot return / DO NOTHING
			if (!message.content.startsWith(prefix)) return; // if message doesn't have the prefix return / DO NOTHING
			const args = message.content.slice(prefix.length).trim().split(/ +/g) // takes the prefix.length and splits it from future cases
			var delCmd = message.delete().catch(O_o=>{}); // deletes the command from viewing in chat (If I do !kick name it will kick name then delete the command I used so no one sees it)
			var msg = message.channel.send;
			switch (args[0].toLowerCase()) { //takes the prefix then adds the case to it whether capital or not?
				case "kick":
          if (!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) ) { //Array.some() used to find roles allowed to use this command
            delCmd
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription(permError).setColor(red)); // if not those roles it will throw this error
					}
					let member = message.mentions.members.first() || message.guild.members.get(args[0]); // grabs the member name
					if (!member) { // if it can't find the mentioned name throw this error
						delCmd;
						//msg(new Discord.RichEmbed().setTitle("ERROR!").setDescription("User not found?").setColor(red));
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("User not found?").setColor(red));
					}
					// If we can't kick the member then they have
					if (!member.kickable) {
						delCmd;
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("I can't kick this User").setColor(red));
					}
					let channel = member.guild.channels.find(ch => ch.name === 'mod-action'); // sets channel to the channel we want to send the moderation log to
					let reason = args.slice(2).join(' '); // Takes the reason and slices it from the rest of the characters
					let goodbye = member.send(new Discord.RichEmbed().setTitle("You were kicked from Drunk Squad Gaming").setDescription(`${message.author.toString()} KICKED YOU FOR "${reason}"`).setColor(red));
					if (!reason) reason = "No reason provided!"; // Default reason if no reason is provided
					if (member.kick) {
						delCmd;
						//message.channel.send("This should delete after 5 seconds").then(message.delete().catch(O_o=>{}));
						channel.send(new Discord.RichEmbed().setTitle("Moderation Log").setDescription(`${message.author.toString()} KICKED ${member.toString()} FOR "${reason}"`).setColor(green));
					}
					await member.kick(reason);
				break; //break is the same as defining the scope of the case if you don't break it will continue executing code until next break!
				case "delete":
				    const deleteCount = parseInt(args[0], 10);
					if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("Provide a Number between 2 and 99").setColor(red));
					}
					const fetched = await message.channel.fetchMessages({limit: deleteCount});
					message.channel.bulkDelete(fetched)
					message.channel.send(new Discord.RichEmbed().setTitle("That was some cleaning..").setDescription("DELETED " + deleteCount + " Total Messages").setColor(green));
				break;
				case "clear":
					//if () {
						
					//}
				break;
				// If no case is matched this default code is then ran MUST BE LAST
				default:message.channel.send(new Discord.RichEmbed().setTitle("ERROR! Unknown Command").setColor(red));
			}
		}

		catch(err){
			var a = "Unknown Error has happened when trying this command."
			var b = "Do you have Permission to run this command? You can't run Admin Commands in Direct Message"
			console.log(err)
			message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription(err).setColor(red));
			message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription(`${a}\n${b}`).setColor(red));
		}
	}
};