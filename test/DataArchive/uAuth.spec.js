var app = require('./../helper/app');
var constants = require('./../../server/config/constants/daConstants');
var uAuth = require('./../../server/services/uAuth');

describe('Test for uAuth functions', function() {

  describe('Test isAuthorized function', function() {
    var authString = '';
    it('Fail to authorize with wrong authString', function(done) {
      authString = 'test';
      uAuth.isAuthorized('pw', authString).should.equal(false);
      done();
    });

    it('Success to authorize with correct authString', function(done) {
      var key = 'id',
        pwd = 'pw',
        ts = uAuth.createTimeStamp(),
        nonce = '969f87f1b933d73b4107bc4122399e52',
        sign = uAuth.createSignature(key, pwd, nonce, ts);

      authString = 'uauth_consumer_key=' + key
        + '&uauth_nonce=' + nonce
        + '&uauth_tiemstamp=' + ts
        + '&uauth_signature=' + sign
        + '&uauth_version=' + constants.uAuth.version;
      uAuth.isAuthorized(pwd, authString).should.equal(true);
      done();
    });
  });
});