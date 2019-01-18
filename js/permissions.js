const Discord = require("discord.js");
const red = 0xff0008;
module.exports = {
 	isAdmin:   r=>["Admin"].includes(r.name), // Array.some(string, param)
 	isMod:     r=>["Moderator", "Admin"].includes(r.name),
 	isOfficer: r=>["Officer", "Moderator", "Admin"].includes(r.name),
 	isMember:  r=>["Member", "Officer", "Moderator", "Admin"].includes(r.name),
 	noPerms: function(message, member){
 		message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("You do not have permission to run this Command!").setColor(red));
 	}
 }