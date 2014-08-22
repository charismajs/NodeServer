/**
 * Created by LuckyJS on 2014. 8. 22..
 */
var os = require('os');
var ifaces = os.networkInterfaces();

//- http://nodejs.org/api/os.html#os_os_networkinterfaces
var getNetworkIP = function(netDev, netFamily, isInternal) {
  var result = '127.0.0.1';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function(details){
      if ( (dev === netDev) && (details.family === netFamily) && (isInternal ? details.internal : !details.internal) ) {
        result = details.address;
      }
    });
  }
  return result;
};

exports.getNetworkIP = getNetworkIP;