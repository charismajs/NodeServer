/**
 * Created by LuckyJS on 2014. 8. 22..
 */
var net = require('net');
var os = require('os');
var ifaces = os.networkInterfaces();
var google = 'www.google.com';

var exec = require('child_process').exec;
var ping = 'ping -4 %COMPUTERNAME%';

//- http://nodejs.org/api/os.html#os_os_networkinterfaces
var getNetworkIP = function(netDev, netFamily, isInternal) {
  // 1. check online
  //  if connected then get a ip by online method
  //  else check platform
  //    if windows then
  //    else get a ip

  var ip = '127.0.0.1';

  if (isConnectedOnline(google)) {
    getNetworkIP_Online(google, 80, function(err, result) {
      if (!err) {
        console.log('Error in getNetworkIP_Online : ', err);
      }
      else {
        ip = result;
      }
    });
  }
  else {
    if (process.platform == 'win32') {
      ip = getNetworkIP_Windows()
    }
    else {
      ip = getNetworkIP_Mac(netDev, netFamily, isInternal);
    }
  }

  return ip;
};


var isConnectedOnline = function(url) {
  require('dns').resolve(url, function(err) {
    return err ? false : true;
  })
};

var getNetworkIP_Online = function(url, port, callback) {
  var socket = net.createConnection(port, url);
  socket.on('connect', function() {
    callback(undefined, socket.address().address);
    socket.end();
  });

  socket.on('error', function(err) {
    callback(err, 'Error');
  })
};

var getNetworkIP_Windows = function() {
  var child = exec(ping, function(err, stdout, stderr) {
    if (err) {
      console.log(err);
      throw err;
    }
    else {
      console.log('child : ', stdout);
      return stdout;
    }
  });
};

var getNetworkIP_Mac = function(netDev, netFamily, isInternal) {
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