var request = require('request');
var lat = 43.6534922;
var lon = -79.3839729;

var requestUrl;
var returnMessage = '';

function ExtractData() {}

function generateReturnMessage(userMessage, data, callback){
    for(var i of data.TRAFFICITEMS.TRAFFICITEM){
        if(i.TRAFFICITEMDESCRIPTION[1].content.indexOf(userMessage) > -1) {
            returnMessage += i.TRAFFICITEMDESCRIPTION[1].content + '\n\n';
        }
    }
    if(returnMessage == ''){
        callback('');
    } else {
        callback(returnMessage);
    }
    returnMessage = '';
}

function generateFlowReturnMessage(userMessage, data, callback){
    var currentMessage = '';
    for(var i of data.RWS[0].RW){
        currentMessage = ('On ' + JSON.stringify(i.DE) +
        ': \nFrom the starting point to ' + JSON.stringify(i.FIS[0].FI[0].TMC.DE) +
        ' has a jam factor of ' + JSON.stringify(i.FIS[0].FI[0].CF[0].JF) + ' out of 10.\n\n');
        for(var j = 1; j<=i.FIS[0].FI.length-1; j++){
            currentMessage += ('From ' + JSON.stringify(i.FIS[0].FI[j-1].TMC.DE) + ' to ' +
                        JSON.stringify(i.FIS[0].FI[j].TMC.DE) + ' has a jam factor of ' +
                      JSON.stringify(i.FIS[0].FI[j].CF[0].JF) + ' out of 10.\n\n');
        }
        if(i.DE.indexOf(userMessage) > -1){
            returnMessage += currentMessage + '\n';
        }
    }
    if(returnMessage == ''){
      callback('');
    } else {
      callback(returnMessage);
    }
    returnMessage = '';
}

ExtractData.prototype.extractionRequest = function extractionRequest(userMessage, callback){
    var z = 8,       // Zoom level
    latRad,
    n,
    xTile,
    yTile;

    latRad = lat * Math.PI / 180;
    n = Math.pow(2, z);
    xTile = n * ((lon + 180) / 360);
    yTile = n * (1-(Math.log(Math.tan(latRad) + 1/Math.cos(latRad)) / Math.PI)) / 2;
      requestUrl = 'https://traffic.cit.api.here.com/traffic/6.0/incidents/json' +
                        '/' + z + '/' + Math.floor(xTile) + '/' + Math.floor(yTile);
    request.get({
        url : requestUrl,
        qs:{
            'app_id': 'MvDdxhQdDnQMCQxVG2u9',
            'app_code': 'mEDyU_ALl5rNUSsDSbteDQ',
            'c': 'CA',
            'lg': 'en',
            'il8n': true,
            'localtime': true
        }
    }, function(err, res, body){
        if(err){
            console.log(err);
        } else {
            generateReturnMessage(userMessage, JSON.parse(body), function(returnMessage){
                callback(returnMessage);
            });
        }
    });
}

ExtractData.prototype.flowExtractionRequest = function flowExtractionRequest(userMessage, callback){
    var z = 10,       // Zoom level
    latRad,
    n,
    xTile,
    yTile;

    latRad = lat * Math.PI / 180;
    n = Math.pow(2, z);
    xTile = n * ((lon + 180) / 360);
    yTile = n * (1-(Math.log(Math.tan(latRad) + 1/Math.cos(latRad)) / Math.PI)) / 2;
    requestUrl = 'https://traffic.cit.api.here.com/traffic/6.1/flow/json' +
                    '/' + z + '/' + Math.floor(xTile) + '/' + Math.floor(yTile);
    request.get({
      url : requestUrl,
      qs:{
          'app_id': 'MvDdxhQdDnQMCQxVG2u9',
          'app_code': 'mEDyU_ALl5rNUSsDSbteDQ'
      }
    }, function(err, res, body){
        if(err){
            console.log(err);
        } else {
            generateFlowReturnMessage(userMessage, JSON.parse(body), function(returnMessage){
                callback(returnMessage);
            });
        }
    });
}

module.exports = ExtractData;