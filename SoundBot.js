const config = require('./config/default.json');
const Discord = require("discord.js");
const client = new Discord.Client();

var version = '1.1';
client.login(config.token); 

client.on("message", msg => 
{
    if (msg.content.startsWith("!Allahu Akbar")) 
	{
		playSound(`sound/akbar1.mp3`, msg);
	}
	
	if (msg.content.startsWith("!TerroristsWin")) 
	{
		playSound(`sound/csgoTerroristsWin.mp3`, msg);
	}
	
	if (msg.content.startsWith("!Genius")) 
	{
		playSound(`sound/genius.mp3`, msg);
	}
	
	if (msg.content.startsWith("!WhoRYou")) 
	{
		playSound(`sound/whoRYou.mp3`, msg);
	}
	
	if (msg.content.startsWith("!ProveIt")) 
	{
		playSound(`sound/proveIt.mp3`, msg);
	}
	
	if (msg.content.startsWith("!UmmmNo")) 
	{
		playSound(`sound/ummmNo.mp3`, msg);
	}
	
	if (msg.content.startsWith("!NotToday")) 
	{
		playSound(`sound/notToday.mp3`, msg);
	}
	
	if (msg.content.startsWith("!Now")) 
	{
		playSound(`sound/now.mp3`, msg);
	}
	
	if (msg.content === '!HelpRiley') {
		listCommands(msg);
		return;
	}
	
	if (msg.content === '!kys') {
		client.destroy();
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
	'!HelpRiley      --- Show this message',
	'!Allahu Akbar   --- Play "ALLAHU AKBAR!" sound',
	'!TerroristsWin  --- Play CS GO "Terrorists Win" sound',
	'!Genius         --- Play "Genius!" sound',
	'!WhoRYou        --- Play "Who are you?" sound',
	'!ProveIt        --- Play "Prove It!" sound',
	'!UmmmNo         --- Play "Ummmm no?!?!?" sound',
	'!NotToday       --- Play "Not today!" sound',
	'!Now            --- Play "Now!" sound',
	'```'
	];
	msg.channel.sendMessage(message);
}
