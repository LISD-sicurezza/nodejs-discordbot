const Discord = require("discord.js");
const Perm = require("./permissions.js");
const kickJS = require("./kick.js");
const config = require('./config.json');
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


var mExport = module.exports = {};
mExport.commands = async function (message, member, error) {
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
	switch (args[0].toLowerCase()) {
		case "kick2":
			console.log("Test");
			await kickJS.kick;
		break;
		default: return;
	}
}