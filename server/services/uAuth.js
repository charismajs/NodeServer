var isAuthorized = function(key, secret, authString) {
  if (authString != "") {
    var auths = authString.split("&");
    var conumser_key = auths[0].split("=")[1];
//    var nonce = auths[1].split("=")[1];
//    var timestamp = auths[2].split("=")[1];
//    var signature = auths[3].split("=")[1];
//    var version = auths[4].split("=")[1];

    return conumser_key;
  }
  else {
    return "";
  }
};

exports.isAuthorized = isAuthorized;
