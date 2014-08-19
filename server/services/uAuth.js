//var ffi = require('ffi'),
//    uAuth = ffi.Library('./../../ext/UAuth/UAuth', {
//      // uauth_check_uauth_string
//      // authorized req : 0, else return error code
//      // arguments : key, secret, auth_string
//      'uauth_check_uauth_string':['int',['string','string','string']]
//    });
//exports.module = function() {
//  console.log(req.cookies.uauth);
//  var functions = {
//    checkAuth : function(req, res, next) {
//      if (uAuth.uauth_check_uauth_string('id','pw',req.cookies.uauth) === 0) {
//        next();
//      }
//      else {
//        res.send(401, 'Unauthorized');
//      }
//    }
//  };
//
//  return functions;
//};