/**
 * Created by charismajs on 2014-07-09.
 */
var nano = require('nano');

module.exports = function(config) {
  var dbUri = 'http://' + config.db + ':' + config.db_port;
  var dataBase = nano(dbUri);

  // Create Base64 Object
  var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
  // Usage : Base64.encode(str), Base64.decode(str)


  var checkDBAuth = function(req) {
    dbUri = 'http://' + config.db + ':' + config.db_port;

    var authString = req.header("Authorization");

    if (authString) {
      if (authString.split(" ").length > 0) {
        var accountDecodeStr = Base64.decode(authString.split(" ")[1]);
        dbUri = 'http://' + accountDecodeStr + '@' + config.db + ':' + config.db_port;
      }
    }

    dataBase = nano(dbUri);
  };

  var functions = {

    getDesignView : function(req, res) {
      checkDBAuth(req);

      var db = dataBase.use(req.params.dbName);

      db.view(req.params.designName, req.params.viewName, function(err, body) {
          if (err) {
            res.status(err.status_code || 500).send(err);
          }
          else {
            res.send(body);
          }
      });
    },

    getAttachment : function (req, res) {
      checkDBAuth(req);

      var db = dataBase.use(req.params.dbName);

      db.attachment.get(req.params.docID, req.params.attName, req.query.rev ? {rev: req.query.rev} : null).pipe(res);
    },

    insertAttachment : function(req, res) {
      checkDBAuth(req);

      var db = dataBase.use(req.params.dbName);
      var resource = new Buffer('');

      req.on('data', function(chunk) {
        resource = Buffer.concat([resource, chunk]);
      });

      req.on('end', function() {
        db.attachment.insert(
            req.params.docID, encodeURIComponent(req.params.attName), resource, req.header('Content-Type'), {rev: req.query.rev}, function(err, body) {
              if (err) {
                res.status(err.status_code || 500).send(err);
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
      checkDBAuth(req);

      var db = dataBase.use(req.params.dbName);

      db.get(req.params.docID, req.query.rev ? {rev: req.query.rev} : null, function(err, body) {
        if (err) {
          res.status(err.status_code || 500).send(err);
        }
        else {
          res.send(body);
        }
      });
    },

    insertDocument : function(req, res) {
      checkDBAuth(req);

      var db = dataBase.use(req.params.dbName);
      var doc = req.body;

      if (req.query.rev !== null) {
        doc._rev = req.query.rev;
      }

      db.insert(doc, req.params.docID, function(err, body) {
        if (err) {
          res.status(err.status_code || 500).send(err);
        }
        else {
          res.send(body);
        }
      });
    },

    getDocuments : function(req, res) {
      checkDBAuth(req);

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
          res.status(err.status_code || 500).send(err);
        }
        else {
          res.send(body);
        }
      });
    },

    compactDatabase : function(req, res) {
      checkDBAuth(req);

      var db = dataBase.use(req.params.dbName);

      db.compact(req.params.dbName, function(err, body) {
        if (err) {
          res.status(err.status_code || 500).send(err);
        }
        else {
          res.send(body);
        }
      });
    },

    purgeDatabase : function(req, res) {
      checkDBAuth(req);

      dataBase.db.destroy(req.params.dbName, function(err, body) {
        if (err) {
          res.status(err.status_code || 500).send(err);
        }
        else {
          res.send(body);
        }
      });
    },

    createDatabase : function(req, res) {
      checkDBAuth(req);

      dataBase.db.create(req.params.dbName, function(err, body) {
        if (err) {
          res.status(err.status_code || 500).send(err);
        }
        else {
          res.send(body);
        }
      });
    },

    createDocument : function (req, res) {
      checkDBAuth(req);

      var db = dataBase.use(req.params.dbName);
      var doc = req.body;

      db.insert(doc, function(err, body) {
        if (err) {
          res.status(err.status_code || 500).send(err);
        }
        else {
          res.send(body);
        }
      });
    },

    getDataBases : function(req, res) {
//      checkDBAuth(req);

      dataBase.db.list(function(err, body) {
        if (err) {
          res.status(err.status_code || 500).send(err);
        }
        else {
          res.send(body);
        }
      });
    }
  };

  return functions;
};
