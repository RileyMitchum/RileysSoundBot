const config = require('./config/default.json');
const Discord = require("discord.js");
const client = new Discord.Client();

var version = '1.1.2';
client.login(config.token); 

client.on("message", msg => 
{
	if (msg.content.startsWith("!"))
	{
		var command = msg.content.toLowerCase();
		switch (command)
		{
			case ("!allahu akbar"):
				playSound(`sound/akbar1.mp3`, msg);
				break;
			case ("!terroristswin"):
				playSound(`sound/csgoTerroristsWin.mp3`, msg);
				break;
			case ("!genius"):
				playSound(`sound/genius.mp3`, msg);
				break;
			case ("!whoryou"):
				playSound(`sound/whoRYou.mp33`, msg);
				break;
			case ("!proveit"):
				playSound(`sound/proveIt.mp3`, msg);
				break;
			case ("!ummmno"):
				playSound(`sound/ummmNo.mp3`, msg);
				break;
			case ("!nottoday"):
				playSound(`sound/notToday.mp3`, msg);
				break;
			case ("!now"):
				playSound(`sound/now.mp3`, msg);
				break;
			case ("!helpriley"):
				listCommands(msg);
				break;
			case ("!kys"):
				client.destroy();
				break;
			default:
				msg.channel.sendMessage("You clearly have no idea what you are doing.  Here is the list of commands.");
				listCommands(msg);
		}
	}
});

client.on('ready', () => 
{
	console.log('Rileys Sound v' + version + ' Bot is Running!');
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
	'- Generic Audio -',
	'!HelpRiley      --- Show this message',
	'!Allahu Akbar   --- Play "ALLAHU AKBAR!" sound',
	'!TerroristsWin  --- Play CS GO "Terrorists Win" sound',
	' ',
	'- Nick\'s Audio -',
	'!Genius         --- Play "Genius!" sound.  Audio courtesy of Nick',
	'!WhoRYou        --- Play "Who are you?" sound.  Audio courtesy of Nick',
	'!ProveIt        --- Play "Prove It!" sound.  Audio courtesy of Nick',
	'!UmmmNo         --- Play "Ummmm no?!?!?" sound.  Audio courtesy of Nick',
	'!NotToday       --- Play "Not today!" sound.  Audio courtesy of Nick',
	'!Now            --- Play "Now!" sound.  Audio courtesy of Nick',
	'```'
	];
	msg.channel.sendMessage(message);
}