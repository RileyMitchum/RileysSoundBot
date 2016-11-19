const config = require('./config/default.json');
const Discord = require("discord.js");
const client = new Discord.Client();

var version = '1.1';
client.login(config.token); 

client.on("message", msg => 
{
    if (msg.content.startsWith("!Allahu Akbar")) 
	{
		const file = `sound/akbar1.mp3`;
		playSound(file, msg);
	}
	
	if (msg.content.startsWith("!TerroristsWin")) 
	{
		const file = `sound/csgoTerroristsWin.mp3`;
		playSound(file, msg);
	}
	
	if (msg.content.startsWith("!Genius")) 
	{
		const file = `sound/genius.mp3`;
		playSound(file, msg);
	}
	
/* 	if (msg.content.startsWith("!WhoRYou")) 
	{
		const file = `sound/whoRYou.mp3`; // Does not work
		playSound(file, msg);
	} */
	
/* 	if (msg.content.startsWith("!ProveIt")) 
	{
		const file = `sound/proveIt.mp3`; // Does not work
		playSound(file, msg);
	} */
	
	if (msg.content.startsWith("!UmmmNo")) 
	{
		const file = `sound/ummmNo.mp3`;
		playSound(file, msg);
	}
	
	if (msg.content.startsWith("!NotToday")) 
	{
		const file = `sound/notToday.mp3`;
		playSound(file, msg);
	}
	
/* 	if (msg.content.startsWith("!Now")) 
	{
		const file = `sound/now.mp3`; // Does not work
		playSound(file, msg);
	} */
	
	if (msg.content === '!HelpRiley') {
		listCommands(msg);
		return;
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
}

function listCommands(msg) {
	const message = [
	'```',
	'Riley\'s Sound Bot v' + version,
	' ',
	'!HelpRiley      --- Show this message',
	'!Allahu Akbar   --- Play "ALLAHU AKBAR!" sound',
	'!TerroristsWin  --- Play CS GO "Terrorists Win" sound',
	'!Genius         --- Play "Genius!" sound',
	'!WhoRYou        --- Does not currently work -- Play "Who are you?" sound',
	'!ProveIt        --- Does not currently work -- Play "Prove It!" sound',
	'!UmmmNo         --- Play "Ummmm no?!?!?" sound',
	'!NotToday       --- Play "Not today!" sound',
	'!Now            --- Does not currently work -- Play "Now!" sound',
	'```'
	];
	msg.channel.sendMessage(message);
}
