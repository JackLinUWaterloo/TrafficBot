'use strict';

let util = require('util');
let http = require('http');
let Bot  = require('@kikinteractive/kik');

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: 'trafficwatch',
    apiKey: '3d46fc64-c8a7-4b7b-b78d-339b9e335600',
    baseUrl: 'https://d160c049.ngrok.io'
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    if(message.body == "Hello" || message.body == "Hi") {
        bot.getUserProfile(message.from)
            .then((user) => {
                message.reply(`Hey ${user.firstName}! Hope you are doing fine!`);
            });
    } else {
        
    }
});

// // To one user (a.username)
// bot.send(Bot.Message.text('Hey, nice to meet you!'), 'iocds');
// 
// // You can use a shorthand for text messages to keep things a bit cleaner
// bot.send('Getting started is super easy!', 'iocds');

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);
    
server.on('request', function(req, res){
    console.log(req.method);
    console.log(req.headers);
})