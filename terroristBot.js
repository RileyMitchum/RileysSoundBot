var Discord = require("discord.js");
var client = new Discord.Client();

var request = require("superagent");

var token = "<YOUR_TOKEN_HERE>";

client.on("message", msg => {
    if (msg.content.startsWith("!allahu akbar")) {
		const voiceChannel = msg.member.voiceChannel;
		const file = `sound/akbar1.mp3`;
		 
		voiceChannel.join().then((connection) => {
			const dispatcher = connection.playFile(file);
			dispatcher.on('end', () => {
				connection.disconnect();
			});
		}).catch((error) => {
			console.log('Error occured!');
			console.log(error);
		});
	}
	
	if (msg.content.startsWith("!leave")) {
        msg.channel.sendMessage("Goodbye " + msg.author);
		const voiceChannel = msg.member.voiceChannel;
		voiceChannel.leave();
	}
});


client.on('ready', () => {
  console.log('Terroris Bot is Running!');
});

 client.login(token);