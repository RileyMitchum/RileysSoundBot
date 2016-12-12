const config = require('./config/default.json');
const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require('fs');

var version = '2.1';
var files = fs.readdirSync('./sound');
var defaultVoiceChannel = config.defaultVoiceChannel;
var allowDefaultVoice = true;
client.login(config.token); 

client.on("message", msg => 
{
	if (msg.content.startsWith("!"))
	{
		var command = msg.content.toLowerCase();
		if (files.includes(command.substring(1) + '.mp3'))
		{
			playSound(`sound/` + command.substring(1) + `.mp3`, msg);
		}
		else
		{
			switch (command)
			{
				case ("!helpbot"):
					listCommands(msg);
					break;
				case ("!listaudio"):
					msg.channel.sendMessage('Available files: ' + files.toString());
					break;
				default:
					//msg.channel.sendMessage('Not a command...  Try !HelpBot');
			}
		}
	}
});

client.on('ready', () => 
{
	console.log('Rileys Sound v' + version + ' Bot is Running!');
});

function playSound(file, msg) 
{
	var voiceChannel = msg.member.voiceChannel;
	if (voiceChannel == undefined)
	{
		if (allowDefaultVoice == false)
		{
			msg.channel.sendMessage("Join a voice channel!");
			return;
		}
		else
			voiceChannel = client.channels.get(defaultVoiceChannel)		
	}
	
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

function listCommands(msg) {
	const message = [
	'```',
	'Riley\'s Sound Bot v' + version,
	' ',
	'- Commands -',
	'!HelpBot      --- Show this message',
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
	'!Illegal        --- Play "He\'s an illegal" sound.  Audio courtesy of Nick',
	'!WhoRYou        --- Play "Who are you?" sound.  Audio courtesy of Nick',
	' ',
	'- President Trump Audio Expansion Pack -',
	'!Wrong			--- Play Donald Trump saying "Wrong".',
	' ',
	'- Matt\'s Picks Audio Pack -',
	'!LazyD			--- Play "Lazy D".',
	'!Size			--- Play "Size".',
	'!Salami			--- Play "Salami".',
	'!StopIt			--- Play "Stop It".',
	'!PokemonGo			--- Play "Pokemon Go by Misha".',
	'```'
	];
	msg.channel.sendMessage(message);
}
