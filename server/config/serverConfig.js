/**
 * Created by charismajs on 2014-08-06.
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    compression = require('compression'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

//var ffi = require('ffi'),
//    uAuth = ffi.Library('./UAuth', {
//      // uauth_check_uauth_string
//      // authorized req : 0, else return error code
//      // arguments : key, secret, auth_string
//      'uauth_check_uauth_string':['int',['string','string','string']]
//    });

var app = express();
var server = require('http').createServer(app);

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'Node Server for What', resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());

var config = require('./config')[env];

var daRouter = require('./routers/daRouter')(express, config);
var rootRouter = require('./routers/rootRouter')(express);

//app.use(vhost('*.test.com', daRouter));
var ffi = require('ffi'),
    uAuth = ffi.Library('./../../ext/UAuth/UAuth', {
      // uauth_check_uauth_string
      // authorized req : 0, else return error code
      // arguments : key, secret, auth_string
      'uauth_check_uauth_string':['int',['string','string','string']]
    });

var checkAuth = function(req, res, next) {
  console.log(req.cookies.uauth);
  if (uAuth.uauth_check_uauth_string('id','pw',req.cookies.uauth) == 0) {
    next();
  }
  else {
    res.send(401, 'Unauthorized');
  }
};
//app.use(uAuth.checkAuth);
app.use(checkAuth);

//var authChecker = function(req, res, next) {
//  if (req.method == 'GET' || req.method == 'HEAD') {
//    console.log('By PASS : ' + req.method);
//    next();
//  }
//  else {
//    console.log('Reeeeejeeeeeect');
//    res.send('Reject');
//  }
//};
//
//app.use(authChecker);

app.use('/da', daRouter);
app.use('/', rootRouter);

var connected = false;

var start = function() {
  server.listen(config.port, function() {
    connected = true;
    console.log('===== Server running =====');
    console.log('Listening on port ' + config.port);
    console.log('==========================');
  });
};

var close = function() {
  server.close();
  connected = false;
};

exports.start = start;
exports.close = close;
exports.app = app;
exports.connected = connected;



