var request = require('request');
var lat = 43.6534922;
var lon = -79.3839729;
var z = 10,        // Zoom level
latRad,
n,
xTile,
yTile;

latRad = lat * Math.PI / 180;
n = Math.pow(2, z);
xTile = n * ((lon + 180) / 360);
yTile = n * (1-(Math.log(Math.tan(latRad) + 1/Math.cos(latRad)) / Math.PI)) / 2;

var requestUrl = 'https://traffic.cit.api.here.com/traffic/6.0/incidents/json' +
                  '/' + z + '/' + Math.floor(xTile) + '/' + Math.floor(yTile);

// console.log(requestUrl);

function ExtractData() {

}

ExtractData.prototype.extractionRequest = function extractionRequest(message, callback) {
  console.log(message);
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
          console.log(res.statusCode);
          // console.log(body);
          callback(res.statusCode.toString());
      }
  });
}

module.exports = ExtractData;
