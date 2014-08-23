var app = require('./../index/app');
var constants = require('./../../server/config/constants/daConstants');
var uAuth = require('./../../server/services/uAuth');
var common = require('./../helper/daCommon');

describe('Test for uAuth functions', function() {

  describe('Test isAuthorized function', function() {
    var secret = 'pw';
    var authString = '';
    it('Fail to authorize with wrong authString', function(done) {
      authString = 'test';
      uAuth.isAuthorized(secret, authString).should.equal(false);
      done();
    });

    it('Success to authorize with correct authString', function(done) {
      authString = common.getAuthString();
      uAuth.isAuthorized(secret, authString).should.equal(true);
      done();
    });
  });
});