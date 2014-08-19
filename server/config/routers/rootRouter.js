module.exports = function(express) {
  var router = express.Router();

  router.route('/')
      .get(function(req, res) {
        res.send('Hello there~!!! This is a Server for UBcare.');
      });

  router.route('*')
      .get(function(req, res) {
        res.send('How do you get to here?? Plz check your url and try it again!!');
      });

  return router;
};