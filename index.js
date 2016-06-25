'use strict';

let util = require('util');
let http = require('http');
let Bot  = require('@kikinteractive/kik');
let ExtractData = require('./trafficRequest');

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: 'trafficwatch',
    apiKey: '3d46fc64-c8a7-4b7b-b78d-339b9e335600',
    baseUrl: 'https://e1ca1c70.ngrok.io'
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    var dataExtractor = new ExtractData();
    if(message.body == "Hello" || message.body == "Hi" || message.body == 'Hey') {
        bot.getUserProfile(message.from)
            .then((user) => {
                message.reply(`Hey ${user.firstName}! Hope you are doing fine!`);
            });
    } else {
        dataExtractor.extractionRequest(message.body,
          function(returnMessage) {
            message.reply(returnMessage);
          }
        );
    }
});

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);

server.on('request', function(req, res){
    console.log(req.method);
    console.log(req.headers);
})