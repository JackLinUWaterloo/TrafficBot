var request = require('request');

request.post({
    url : 'http://dev.virtualearth.net/REST/v1/Traffic/Incidents/mapArea/includeLocationCodes?severity=severity1,severity2,severityn&type=type1,type2,typen&key=sSD8GTh2fjzOCK5MQY48~TOeiR5xGWwYMRbIWKIhG7Q~AgCkIOmyG5pn-1QDaKefJ9PPfrx3i9oZLpRuJ5vwazPQOCTRbb_kNdnb43DdsTiW',
    headers:{
        'Content-Type': 'application/json'
    }
}, function(err, res, body){
    if(err){
        console.log(err);
    } else {
        console.log(body);
    }
    console.log(body);
});