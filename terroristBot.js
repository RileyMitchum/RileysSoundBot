var Discord = require("discord.js");
var client = new Discord.Client;
var request = require("superagent");

client.login("<YOUR_TOKEN_HERE>"); 

client.on("message", msg => 
{
    if (msg.content.startsWith("!allahu akbar")) 
	{
		client.sendFile(msg.channel, "./sound/image.jpg");
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
  console.log('I am ready, and running!');
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
