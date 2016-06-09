var request = require('request');

request.get({
    url : 'https://api.kik.com/v1/config',
    auth: {
            'user' : 'trafficwatch',
            'pass' : '3d46fc64-c8a7-4b7b-b78d-339b9e335600'
    }
}, function(err,httpResponse,body){
    if(err){
        res.send(err);
    }
    console.log(body);
    console.log(httpResponse.statusCode);
    if(httpResponse.statusCode === 200){
        console.log(body);
    }
});