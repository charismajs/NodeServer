/**
 * Created by LuckyJS on 2014. 8. 14..
 */
module.exports = function() {
  return {
    isAuthorized : function(req, res) {
      if (req.method == 'GET' || req.method == 'HEAD') {
        return true;
      }
      else return false;
    }
  };
}