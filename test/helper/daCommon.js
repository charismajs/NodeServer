/**
 * Created by LuckyJS on 2014. 8. 23..
 */
var app = require('./../index/app');
var constants = require('./../../server/config/constants/daConstants');
var uAuth = require('./../../server/services/uAuth');

exports.getAuthString = function() {
  var key = 'id',
    pwd = 'pw',
    ts = uAuth.createTimeStamp(),
    nonce = '969f87f1b933d73b4107bc4122399e52',
    sign = uAuth.createSignature(key, pwd, nonce, ts);

  var authString = 'uauth_consumer_key=' + key
    + '&uauth_nonce=' + nonce
    + '&uauth_tiemstamp=' + ts
    + '&uauth_signature=' + sign
    + '&uauth_version=' + constants.uAuth.version;

  return authString;
};
