var request = require('request');

request.post({
    url : 'https://api.kik.com/v1/config',
    auth: {
            'user' : 'trafficwatch',
            'pass' : '3d46fc64-c8a7-4b7b-b78d-339b9e335600'
        }, 
    headers:{
        'Content-Type': 'application/json'
    },
    json: true,
    body :{
        "webhook": "https://example.com/incoming",
        "features": {
           "manuallySendReadReceipts": false,
           "receiveReadReceipts": false,
           "receiveDeliveryReceipts": false,
           "receiveIsTyping": false
        }
    }
}, function(err, res, body){
    if(err){
        res.send(err);
    }
    console.log(res.statusCode);
    console.log(body);
});