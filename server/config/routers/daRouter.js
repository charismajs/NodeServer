/**
 * Created by charismajs on 2014-07-08.
 * For Data Archive with CouchDB
 */
module.exports = function(express, config) {
  var da = require('./../../routes/dataArchive')(config);
//  var auth = require('./../../services/authorization');
  var router = express.Router();

//  router.all('*', auth.isAuthorized, next);

  router.route('/:dbName/:docID/:attName')
      .get(da.getAttachment)
      .put(da.insertAttachment);

  router.route('/:dbName/:docID')
      .head(da.getHead)
      .get(da.getDocument)
      .put(da.insertDocument);

  router.route('/:dbName/_all_docs')
      .get(da.getDocuments);

  router.route('/:dbName/_view_cleanup')
      .post(da.viewCleanup);

  router.route('/:dbName/_compact/:dDocName')
      .post(da.compactDesignDoc);

  router.route('/:dbName/_compact')
      .post(da.compactDatabase);

  router.route('/:dbName/_purge')
      .post(da.purgeDatabase);

  router.route('/:dbName')
      .put(da.createDatabase)
      .post(da.createDocument); // not tested

  router.route('/_all_dbs')
      .get(da.getDataBases);


  router.route('/')
      .get(function(req, res) {
        res.send('These are services for Data Archive.');
      });

  router.route('*')
      .get(function(req, res) {
        res.send('How do you get to here?? Plz check your url and try it again!!');
      });

  return router;
};