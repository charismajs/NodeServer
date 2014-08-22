/**
 * Created by charismajs on 2014-07-08.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

var network = require('./../services/network');


module.exports = {
  development: {
//    server: 'http://192.168.246.10:5984', // youngmin
    server: network.getNetworkIP('en0', 'IPv4', false), // jinsu
    port: process.env.PORT || 3030,
    db: 'http://192.168.246.10', // youngmin
//    db: 'http://192.168.246.11', // jinsu
    db_port: '5984',
    rootPath: rootPath
  },
  production: {
    server: '',
    port: '',
    db: '',
    db_port: '',
    rootPath: rootPath
  }
};