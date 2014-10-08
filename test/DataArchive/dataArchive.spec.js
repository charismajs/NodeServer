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
  var authString = common.getAuthString();

  after('Clean up test data', function(done) {
    request(baseUrl)
      .post('/' + dbName + '/_purge')
      .set('Cookie', "uauth=" + authString)
      .expect(200)
      .end(function(err, res) {
        var result = res.body;
        result.ok.should.equal(true);
        done();
      });
  });


  it('should return a new db', function(done) {
    request(baseUrl)
      .put('/' + dbName)
      .set('Cookie', "uauth=" + authString)
      .expect(201)
      .end(function(err, res) {
        var result = res.body;
        result.ok.should.equal(true);
        done();
      });
  });

  it('should return a inserted document', function(done) {
    request(baseUrl)
      .post('/' + dbName)
      .set('Cookie', "uauth=" + authString)
      .send(newDocument)
      .expect(200)
      .end(function(err, res) {
        var result = res.body;
        result.ok.should.equal(true);
        done();
      });
  });

  it('should return a list of database', function(done) {
    request(baseUrl)
      .get('/' + dbName + '/_all_docs')
      .expect(200)
      .end(function(err, res) {
        var result = res.body;
        // TODO : add test code
        done();
      });
  });

  it('should return a head of document', function(done) {
    done();
  });
});