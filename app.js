const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');

client.on("ready", () => {
  console.log(`ready!`);
});

var isReady = true;

client.on("message", (message) => {
  if (isReady && message.content == "!countdown") {
    if (message.member.voiceChannel) {
      var voiceChannel = message.member.voiceChannel;
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile('./countdown.mp3');
        dispatcher.on("end", end => {
          voiceChannel.leave();
        });
      }).catch(err => console.log(err));
    }
  }
});

client.login(config.token);
