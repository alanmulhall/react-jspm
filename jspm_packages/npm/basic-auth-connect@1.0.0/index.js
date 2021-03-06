/* */ 
(function(Buffer) {
  var http = require("http");
  module.exports = function basicAuth(callback, realm) {
    var username,
        password;
    if ('string' == typeof callback) {
      username = callback;
      password = realm;
      if ('string' != typeof password)
        throw new Error('password argument required');
      realm = arguments[2];
      callback = function(user, pass) {
        return user == username && pass == password;
      };
    }
    realm = realm || 'Authorization Required';
    return function(req, res, next) {
      var authorization = req.headers.authorization;
      if (req.user)
        return next();
      if (!authorization)
        return unauthorized(res, realm);
      var parts = authorization.split(' ');
      if (parts.length !== 2)
        return next(error(400));
      var scheme = parts[0],
          credentials = new Buffer(parts[1], 'base64').toString(),
          index = credentials.indexOf(':');
      if ('Basic' != scheme || index < 0)
        return next(error(400));
      var user = credentials.slice(0, index),
          pass = credentials.slice(index + 1);
      if (callback.length >= 3) {
        callback(user, pass, function(err, user) {
          if (err || !user)
            return unauthorized(res, realm);
          req.user = req.remoteUser = user;
          next();
        });
      } else {
        if (callback(user, pass)) {
          req.user = req.remoteUser = user;
          next();
        } else {
          unauthorized(res, realm);
        }
      }
    };
  };
  function unauthorized(res, realm) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="' + realm + '"');
    res.end('Unauthorized');
  }
  ;
  function error(code, msg) {
    var err = new Error(msg || http.STATUS_CODES[code]);
    err.status = code;
    return err;
  }
  ;
})(require("buffer").Buffer);
