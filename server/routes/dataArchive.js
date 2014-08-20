/**
 * Created by charismajs on 2014-07-09.
 */
var nano = require('nano');

module.exports = function(config) {
  var dbUri = config.db + ':' + config.db_port;
//  var dbUri = 'http://admin:admin@192.168.246.11:5984'; // for testing
  var dataBase = nano(dbUri);

  var functions = {
    getAttachment : function (req, res) {
      var db = dataBase.use(req.params.dbName);

      db.attachment.get(req.params.docID, req.params.attName, req.query.rev ? {rev: req.query.rev} : null).pipe(res);
    },

    insertAttachment : function(req, res) {
      var db = dataBase.use(req.params.dbName);
      var resource = new Buffer('');

      req.on('data', function(chunk) {
        resource = Buffer.concat([resource, chunk]);
      });

      req.on('end', function() {
        db.attachment.insert(
            req.params.docID, encodeURIComponent(req.params.attName), resource, req.header('Content-Type'), {rev: req.query.rev}, function(err, body) {
              if (err) {
                res.send(err.status_code, err);
              }
              else {
                res.send(body);
              }
            }
        );
      });
    },

    getHead : function(req, res) {
      var db = dataBase.use(req.params.dbName);

      db.head(req.params.docID, function(err, _, body) {
        if (err) {
          res.writeHead(err.status_code || 404, err);
          res.end();
        }
        else {
          res.writeHead(200, body);
          res.end();
        }
      });
    },

    getDocument : function (req, res) {
      var db = dataBase.use(req.params.dbName);

      db.get(req.params.docID, req.query.rev ? {rev: req.query.rev} : null, function(err, body) {
        if (err) {
          res.send(err.status_code, err);
        }
        else {
          res.send(body);
        }
      });
    },

    insertDocument : function(req, res) {
      var db = dataBase.use(req.params.dbName);
      var doc = req.body;

      if (req.query.rev !== null) {
        doc._rev = req.query.rev;
      }

      db.insert(doc, req.params.docID, function(err, body) {
        if (err) {
          res.send(err.status_code, err);
        }
        else {
          res.send(body);
        }
      });
    },

    getDocuments : function(req, res) {
      var db = dataBase.use(req.params.dbName);

      db.list(function(err, body) {
        res.send(body.rows);
      });
    },

    viewCleanup : function(req, res) {
      res.send('Plz wait...');
    },

    compactDesignDoc : function(req, res) {
      var db = dataBase.use(req.params.dbName);

      db.compact(req.params.dbName, req.params.dDocName, function(err, body) {
        if (err) {
          res.send(err.status_code, err);
        }
        else {
          res.send(body);
        }
      });
    },

    compactDatabase : function(req, res) {
      console.log('in CompactDatabase');
      var db = dataBase.use(req.params.dbName);

      db.compact(req.params.dbName, function(err, body) {
        if (err) {
          res.send(err.status_code, err);
        }
        else {
          res.send(body);
        }
      });
    },

    purgeDatabase : function(req, res) {
      dataBase.db.destroy(req.params.dbName, function(err, body) {
        if (err) {
          res.send(err.status_code, err);
        }
        else {
          res.send(body);
        }
      });
    },

    createDatabase : function(req, res) {
      dataBase.db.create(req.params.dbName, function(err, body) {
        if (err) {
          res.send(err.status_code, err);
        }
        else {
          res.send(body);
        }
      });
    },

    createDocument : function (req, res) {
      var db = dataBase.use(req.params.dbName);
      var doc = req.body;

      db.insert(doc, function(err, body) {
        if (err) {
          res.send(err.status_code, err);
        }
        else {
          res.send(body);
        }
      });
    },

    getDataBases : function(req, res) {
      dataBase.db.list(function(err, body) {
        res.send(body);
      });
    },

    test : function(req, res) {
      console.log('in test');

      if (req.method == 'GET' || req.method == 'HEAD') {
        console.log('METHOD : ' + req.method);
      }
      else {
        res.send(404, 'Reject');
      }
    }

  };

  return functions;
};
