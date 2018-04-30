var db = require('../db')
var User = db.models.User;

var sessionSet = function(req, res, next) {
  console.log(req.session);
  if (req.session && typeof(req.session.user)!="undefined" && req.session.user!=null) {
    db.models.User.findOne({ username: req.session.user.username }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
}

module.exports = sessionSet;