var Discord = require("discord.js");
var client = new Discord.Client({
    autorun: true,
    token: "MjQ3OTQyMDg1MzEzODIyNzIy.Cwwhnw.1TLXaMhwEryuhIArI4E2sqx5wdc"
});

var request = require("superagent");

client.on("message", msg => {
    if (msg.content.startsWith("!allahu akbar")) {
		const voiceChannel = msg.member.voiceChannel;
		const file = `sound/sound1.mp3`;
		 
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
  console.log('I am ready, and running!');
});

 client.login("MjQ3OTQyMDg1MzEzODIyNzIy.Cwwhnw.1TLXaMhwEryuhIArI4E2sqx5wdc"); 