const config = require('./config/default.json');
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(config.token); 

client.on("message", msg => 
{
    if (msg.content.startsWith("!allahu akbar")) 
	{
		const voiceChannel = msg.member.voiceChannel;
		const file = `sound/akbar1.mp3`;
		
		if (voiceChannel != undefined)
		{
			playSound(file, voiceChannel, msg);
		}
	}
	
	if (msg.content.startsWith("!TerroristsWin")) 
	{
		const voiceChannel = msg.member.voiceChannel;
		const file = `sound/csgoTerroristsWin.mp3`;
		
		if (voiceChannel != undefined)
		{
			playSound(file, voiceChannel, msg);
		}
	}
	
	if (msg.content === '!TerroristCommands') {
		listCommands(msg);
		return;
	}
});

client.on('ready', () => 
{
  console.log('Terrorist Bot is Running!');
});

function playSound(file, voiceChannel, msg) 
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

function listCommands(msg) {
  const message = [
    '```',
    '!TerroristCommands  Show this message',
    '!allahu akbar       Play "ALLAHU AKBAR!" sound',
	'!TerroristsWin      Play CS GO "Terrorists Win" sound',
    '```'
  ];
  msg.channel.sendMessage(message);
}
