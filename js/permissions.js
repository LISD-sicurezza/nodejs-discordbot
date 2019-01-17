const Discord = require("discord.js");
const red = 0xff0008;
module.exports = {
 	isAdmin: function(message, member){
 		if (message.member.roles.find(x => x.name === "Admin")) {
 			return true;
 		}
 		else {
 			return false;
 		}
 	},
 	isMod: function(message, member){
 		if (message.member.roles.find("name", "Moderator")) {return true;}
 		else{return false;}
 	},
 	isMember: function(message, member){
 		if (message.member.roles.find("name", "Member")) {return true;}
 		else{return false;}
 	},
 	isError: function(message, member){
 		message.channel.send(new Discord.RichEmbed().setTitle("ERROR!").setDescription("You do not have permission to run this Command!").setColor(red));
 	}
 }