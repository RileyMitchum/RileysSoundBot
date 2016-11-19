const config = require('./config/default.json');
const Discord = require("discord.js");
const client = new Discord.Client();

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
	
	if (msg.content.startsWith("!WhoRYou")) 
	{
		const file = `sound/whoRYou.mp3`; // Does not work
		playSound(file, msg);
	}
	
	if (msg.content.startsWith("!ProveIt")) 
	{
		const file = `sound/proveIt.mp3`; // Does not work
		playSound(file, msg);
	}
	
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
	
	if (msg.content.startsWith("!Now")) 
	{
		const file = `sound/now.mp3`; // Does not work
		playSound(file, msg);
	}
	
	if (msg.content === '!RileysCommands') {
		listCommands(msg);
		return;
	}
});

client.on('ready', () => 
{
	console.log('Rileys Sound Bot is Running!');
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
	'!RileysCommands  Show this message',
	'!Allahu Akbar       Play "ALLAHU AKBAR!" sound',
	'!TerroristsWin      Play CS GO "Terrorists Win" sound',
	'```'
	];
	msg.channel.sendMessage(message);
}
