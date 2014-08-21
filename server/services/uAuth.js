var crypto = require('crypto');

var createSignature = function(key, secret, nonce, timestamp) {
  var base = key + secret + nonce + timestamp;
  var signature = crypto.createHash('md5').update(base).digest('hex');
//  console.log('Signature : ' + signature);
  return signature;
};

var createTimeStamp = function() {
  var ts = new Date().toISOString().
    replace(/T/gi, '').
    replace(/\..+/gi, '').
    replace(/:/gi, '').
    replace(/-/gi, '');
//  console.log('TimeStamp : ' + ts);
  return ts;
};

var isAuthorized = function(secret, authString) {
  console.log('Auth String : ' + authString);
  if (authString != "") {
    var auths = authString.split("&");
    var key = auths[0].split("=")[1];
    var nonce = auths[1].split("=")[1];
    var timestamp = auths[2].split("=")[1];
    var signature = auths[3].split("=")[1];
    var version = auths[4].split("=")[1];

    if (version == '1.0') {
      if (signature == createSignature(key, secret, nonce, timestamp)) {
        if (createTimeStamp() - timestamp <= 0) {
          return true;
        }
      }
    }
  }
  return false;
};

exports.isAuthorized = isAuthorized;
