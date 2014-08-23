/**
 * Created by charismajs on 2014-07-11.
 */
var app = require('./../index/app'),
  config = require('./../../server/config/config')['development'],
  constants = require('./../../server/config/constants/daConstants'),
  request = require('supertest');
var common = require('./../helper/daCommon');

describe('Test for Data Archive with CouchDB', function() {
  var baseUrl = config.server + ':' + config.port + '/' + constants.servicePrefix;
  var dbName = 'testcase';
  var newDocument = { testAttribute: 'This is a test value.' };

//  before('Start Server', function(done) {
//    if (!app.server.connected) {
//      app.server.start();
//      done();
//    }
//  });

//  after('Clean up test data', function(done) {
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
    var authString = common.getAuthString();

    request(baseUrl)
      .put('/' + dbName)
      .set('Cookie', "uauth=" + authString)
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