/**
 * Created by charismajs on 2014-07-08.
 */
var ip = require('ip');
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var constants = require('./constants/daConstants');

module.exports = {
  development: {
    server: ip.address(),
    port: process.env.PORT || 3030,
    db: constants.database.ip, // youngmin
    db_port: constants.database.port,
    rootPath: rootPath
  },
  production: {
    server: ip.address(),
    port: process.env.PORT || 3030,
    db: constants.database.ip, // youngmin
    db_port: constants.database.port,
    rootPath: rootPath
  }
};