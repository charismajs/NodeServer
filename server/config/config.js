/**
 * Created by charismajs on 2014-07-08.
 */
var ip = require('ip');
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
//    server: 'http://192.168.246.10:5984', // youngmin
    server: ip.address(), // jinsu
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