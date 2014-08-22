var uAuth = require('./../../server/services/uAuth');

describe('Test for uAuth functions', function() {

  describe('Test isAuthorized function', function() {
    it('test split', function(done) {
      var result = uAuth.isAuthorized('pw','test');
      result.should.equal.false;
      done();
    });
  });
});