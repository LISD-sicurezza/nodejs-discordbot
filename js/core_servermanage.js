const Discord = require("discord.js");
const bot = new Discord.Client();

const color = require('./core_colors.js')
const Perm = require("./core_permissions.js");
const config = require('./config.json');

module.exports = {
	onJoin: (member, send, message, channels, guild) => {
		let roleGuest = member.guild.roles.find(r => r.name === config.joinRole);
		let channel = member.guild.channels.find(ch => ch.name === config.joinNotify);
			member.send(new Discord.RichEmbed()
			.setTitle("Welcome to Drunk Squad Gaming!")
		  .setDescription(`My creators haven't gotten this far to add a cool looking welcome message... so WELCOME!`)
		  .setColor(color.matGreen));
		  channel.send(new Discord.RichEmbed()
		  .setTitle("New Guest has arrived!")
		  .setDescription(`${member} Just joined the server there are [PLACE HOLDER USERS]`)
		  .setColor(color.green));
		  member.addRole(roleGuest);
	},
	filter: async function(message, member, err, DMChannel, setActivity) {
		if (!message.guild) return; // If message is sent in DM return / Do nothing THIS DOESN'T WORK
		if (message.author.equals(bot.user)) return; // if message is from bot return / DO NOTHING
		for (var i = 0; i < config.blacklist.length; i++) {
		  if (message.content.includes(config.blacklist[i])) {
		    	message.delete(0);
		    	message.channel.send(new Discord.RichEmbed()
		    	.setTitle("MESSAGE REMOVED")
		      .setDescription(`Your message contained a word we don't use here.`)
		      .setColor(color.red)).then(message => {message.delete(5000).catch(O_o=>{})});			
		    break;
		  }
		}
	}
}