/**
 * Created by charismajs on 2014-07-11.
 */
var app = require('./../helper/app'),
    config = require('./../../server/config/config')['development'],
    request = require('supertest');

describe('Test for Data Archive with CouchDB', function() {
  var baseUrl = config.server + ':' + config.port + '/da';
  var dbName = 'testcase';
  var newDocument = { testAttribute: 'This is a test value.' };

  before('Server', function(done) {
    if (!app.server.connected) {
      app.server.start();
      done();
    }
  });

//  after(function(done) {
//    request(baseUrl)
//        .post('/' + dbName + '/_purge')
//        .expect(200)
//        .end(function(err, res) {
//          var result = res.body;
//          result.should.have.property('purge_seq');
//          done();
//        });
//  });

  it('should return a new db', function(done) {
    request(baseUrl)
        .put('/' + dbName)
        .expect(201)
        .end(function(err, res) {
//          console.log('err : ', err);
//          console.log(res);
          var result = res.body;
          result.ok.should.equal(true);
          done();
        });
  });

//  it('should return a inserted document', function(done) {
//    request(baseUrl)
//        .post('/' + dbName)
//        .send(newDocument)
//        .expect(200)
//        .end(function(err, res) {
//          var result = res.body;
//          result.ok.should.equal(true);
//          done();
//        });
//  });
});