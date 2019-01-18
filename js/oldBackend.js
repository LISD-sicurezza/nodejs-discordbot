const Discord = require("discord.js");
const role = require('./permissions.js');
const green = 0x00ff19;
const red = 0xff0008;
const pink = 0xc842f4;
const purple = 0x7f00ff;
const bot = new Discord.Client();

const embedjson = require('./config.json');
var json = JSON.stringify(embedjson.online);

var prefix = "!";
module.exports = {
	commands: function(message, member, err) {
	try{
		if (message.author.equals(bot.user)) return; // if bot is talking ignore any possible commands
		if (!message.content.startsWith(prefix)) return; // if command doesn't start with the right prefix just ignore it
		var args = message.content.substring(prefix.length).split(" ");
		message.channel.send(new Discord.RichEmbed().setTitle("CONSOLE LOG").setDescription(`${message.channel.toString()} ${message.author.toString()} : ${message.content}`).setColor(pink));
		switch (args[0].toLowerCase()) {
// lists commands
			case "commands":
			var commands = 'Commands : list all commands'; var shutdown = 'Shutdown : Shutdowns the Bot'; var cmdprefix = 'prefix : changes prefix';
			var support = 'Support : sends support notification with your name attached to admin chat'; var coinflip = 'coinflip : Flip a Coin!';
			message.channel.send(new Discord.RichEmbed().setTitle('COMMANDS').setDescription(`${commands} \n ${cmdprefix} \n ${support} \n ${coinflip}`).setColor(purple));
			break;
// generate new invite for 24 hours
			/*case "invite":
				var invite = bot.fetchInvite("NTMzNzQyNzI0NTI0ODAyMDY0.Dxvkpg.hSAt-oGv3nxSZ7kE2B_d7hLMogk");
				message.channel.send(invite);
			break;*/
// send a message to the user telling them support has been notified then notify support
			case "support":
				message.channel.send(new Discord.RichEmbed().setTitle(`All Staff have been notified you need help. When someone becomes available you will get a DM`).setColor(green));
				message.channel.send(new Discord.RichEmbed().setTitle(`SUPPORT REQUEST`).setDescription(`${message.author.toString()} Needs help`).setColor(red));
				break;
// shows heads or tails at random if coinflip is ran
			case "coinflip":
				var heads = new Discord.RichEmbed().setDescription(`${message.author.toString()} HEADS`).setColor(green);
				var tails = new Discord.RichEmbed().setDescription(`${message.author.toString()} TAILS`).setColor(green);
				message.channel.send((Math.floor(Math.random() * 2) == 0) ? tails : heads);
				break;
// ALL ADMIN ONLY COMMANDS /////////////////////////////////////////////////////////////////////////////////////		
// ADMIN COMMAND test message
			case "test":
					if (message.member.roles.find("name", "Admin")) {
						message.channel.send(new Discord.RichEmbed().setTitle("This command worked you are an Admin").setColor(green));
					}
					else {
						message.channel.send(new Discord.RichEmbed().setTitle("Can't use this command you are not an Admin").setColor(red));
					}
			break;
// ADMIN COMMAND shutdown
			case "shutdown":
				if (message.member.roles.find(x => x.name === "Admin")) {
					var exit = function(){process.exit()};
					message.channel.send(new Discord.RichEmbed().setTitle("Shutting down all bots").setColor(red)).then(exit);
				}
				else {message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("You do not have permission to run this Command!").setColor(red))}
			break;
// ADMIN COMMAND set online status shown as playing
			case "setonline":
				if (message.member.roles.find(x => x.name === "Admin")) {
					if (args[1]) {
						embedjson.online = JSON.parse('"Test2"');
						message.channel.send(new Discord.RichEmbed().setTitle("Status changed to: " + json + " From: " + json).setColor(green));
					} else {
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Correct usage: !setplaying game here").setColor(red));
					}
				}
				break;
// ADMIN COMMAND accepts a prefix that is only 1 character long to run all commands
			case "prefix":
				if (message.member.roles.find(x => x.name === "Admin")) {
					if (args[1]) {
						var num = prefix.length+args[0].length+1;
						if (message.content.length != 9) {
							message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Prefix can only be 1 long").setColor(red));
						} 
						else {
							prefix = message.content[num];
							message.channel.send(new Discord.RichEmbed().setTitle("Prefix changed to: " + prefix).setColor(green));
						};
					} 
					else {
						message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Correct usage: !prefix !").setColor(red));
					}
				if (role.isAdmin == false){}
				}
				break;
// default command ran if none of the cases match
			default:
				message.channel.send(new Discord.RichEmbed().setTitle("ERROR: Unknown Command").setColor(red));
		}//end of switch
		}// end of try
		catch(err){
			var a = "Unknown Error has happened when trying this command."
			var b = "Do you have Permission to run this command? You can't run Admin Commands in Direct Message"
			console.log(err)
			message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription(err).setColor(red));
		}
	},
	addRole: member => {
		//member.guild.channels.find("name", "<#532626834987155457>").send(member.toString() + " Just joined the Server");
		//let channel = member.guild.channels.find(ch => ch.name === 'mod-action');
		message.channel.send(member.toString() + " Just joined the Server")
		message.send("welcome to the server");
		//member.addRole(member.guild.roles.find("name", "Guest"));
	}
};
