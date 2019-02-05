const Discord = require("discord.js");
const Perm = require("./core_permissions.js");
const config = require('./config.json');
const ban = require('./cmd_ban.js');
const clear = require('./cmd_clear.js');
const coinflip = require('./cmd_coinflip.js');
const commands = require('./cmd_commands.js');
const cmddelete = require('./cmd_delete.js');
const invite = require('./cmd_invite.js');
const kick = require('./cmd_kick.js');
const nickname = require('./cmd_nickname.js');
const prefix = require('./cmd_prefix.js');
const setonline = require('./cmd_setonline.js');
const shutdown = require('./cmd_shutdown.js');
const unban = require('./cmd_unban.js');
const util = require('util');

const bot = new Discord.Client();
const setTimeoutPromise = util.promisify(setTimeout);

const green = 0x00ff19;
const red = 0xff0008;
const pink = 0xc842f4;
const purple = 0x7f00ff;

/* deletes a message after 10secs this is used to delete notice commands then they go away*/
var del = message => {message.delete(5000).catch(O_o=>{})};
var del60 = message => {message.delete(20000).catch(O_o=>{})};

module.exports = {
	commands: async function(message, member, err, DMChannel, setActivity) {
		try {
			if (message.channel.type === DMChannel) return; // If message is sent in DM return / Do nothing THIS DOESN'T WORK
			if (message.author.equals(bot.user)) return; // if message is from bot return / DO NOTHING
			if (!message.content.startsWith(config.prefix)) return; // if message doesn't have the prefix at the start return / DO NOTHING
			const args = message.content.slice(config.prefix.length).trim().split(/ +/g) // takes the prefix.length and splits it any words to be read so !command it can read "!" and "command"
			switch (args[0].toLowerCase()) { //args[0] is the first character or word AKA prefix then .toLowerCase means any prefix typed is read as lowercase (meaning you can use caps)
				case "commands":
				commands.run(bot, message, args);
				break;
				case "kick":
				kick.run(bot, message, args);
				break;
				case "ban":
				ban.run(bot, message, args);
				break;
				case "unban":
				unban.run(bot, message, args);
				break;
				case "delete":
				cmddelete.run(bot, message, args);
				break;
				case "clear":
				clear.run(bot, message, args);
				break;
				case "prefix":
				prefix.run(bot, message, args);
				break;
				case "setonline":
				setonline.run(bot, message, args);
				break;
				case "shutdown":
				shutdown.run(bot,message,args);
				break;
				case "nickname":
				nickname.run(bot,message,args);
				break;
				case "coinflip":
				coinflip.run(bot,message,args);
				break;
				case "invite":
				invite.run(bot,message,args);
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