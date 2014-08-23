/**
 * Created by charismajs on 2014-08-06.
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),
//    session = require('express-session'),
    compression = require('compression'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
  constants = require('./constants/daConstants');


var app = express();
var server = require('http').createServer(app);

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(session({secret: 'Node Server for What', resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());

var config = require('./config')[env];

var daRouter = require('./routers/daRouter')(express, config);
var rootRouter = require('./routers/rootRouter')(express);
var uAuth = require('./../services/uAuth');

var authChecker = function(req, res, next) {
  if (uAuth.isAuthorized('pw', req.cookies.uauth)) next();
  else res.status(401).send('Unauthorized');
};
app.use(authChecker);

app.use('/' + constants.servicePrefix, daRouter);
app.use('/', rootRouter);

var start = function() {
  server.listen(config.port, function() {
    console.log('\n========== Server is running ==========');
    console.log("Server's Info : " + config.server + ':' + config.port);
    console.log("Database's Info : " + config.db + ':' + config.db_port);
    console.log('=======================================\n');
  });
};

var close = function() {
  server.close();
};

exports.start = start;
exports.close = close;
exports.app = app;



