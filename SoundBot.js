const config = require('./config/default.json');
const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require('fs');

var version = '1.1 DEV';
var files = fs.readdirSync('./sound');
client.login(config.token); 

client.on("message", msg => 
{
	if (msg.content.startsWith("!"))
	{
		var command = msg.content;
		console.log(command);
		console.log(files.includes(command.substring(1) + '.mp3'));
		if (files.includes(command.substring(1) + '.mp3'))
		{
			playSound(`sound/` + command.substring(1) + `.mp3`, msg);
		}
		else
		{
			switch (command)
			{
				case ("!HelpRiley"):
					listCommands(msg);
					break;
				case ("!kys"):
					client.destroy();
					break;
				case ("!ListAudio"):
					msg.channel.sendMessage('Available files: ' + files.toString());
					break;
				default:
					msg.channel.sendMessage('Not a command...');
			}
		}
	}
});

client.on('ready', () => 
{
	console.log('Rileys Sound v' + version + ' Bot is Running!');
	console.log('Available files: ' + files.toString());
});

function playSound(file, msg) 
{
	const voiceChannel = msg.member.voiceChannel;
	if (voiceChannel != undefined)
	{
		voiceChannel.join().then((connection) => 
		{
			const dispatcher = connection.playFile(file);
			dispatcher.on('end', () => 
			{
				connection.disconnect();
			});
		}).catch((error) => 
		{
			console.log('Error occured!');
			console.log(error);
		});
	}
	else
	{
		msg.channel.sendMessage("Join a voice channel you idiot!");
	}
}

function listCommands(msg) {
	const message = [
	'```',
	'Riley\'s Sound Bot v' + version,
	' ',
	'- Commands -',
	'!HelpRiley      --- Show this message',
	'!ListAudio      --- List all available audio files.',
	' ',
	'- Generic Audio -',
	'!Allahu Akbar   --- Play "ALLAHU AKBAR!" sound',
	'!TerroristsWin  --- Play CS GO "Terrorists Win" sound',
	' ',
	'- Nick Audio Expansion Pack With Bonus Kody Sound File -',
	'!Genius         --- Play "Genius!" sound.  Audio courtesy of Nick',
	'!ProveIt        --- Play "Prove It!" sound.  Audio courtesy of Nick',
	'!UmmmNo         --- Play "Ummmm no?!?!?" sound.  Audio courtesy of Nick',
	'!NotToday       --- Play "Not today!" sound.  Audio courtesy of Nick',
	'!Now            --- Play "Now!" sound.  Audio courtesy of Nick',
	'!WhoRYou        --- Play "Who are you?" sound.  Audio courtesy of Kody',
	'```'
	];
	msg.channel.sendMessage(message);
}