var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	if (req.session && typeof(req.session.user)!="undefined" && req.session.user!=null) {
        db.models.User.findOne({ username: req.session.user.username }, function(err, user) {
            if (user) {
                req.user = user;
                delete req.user.password; // delete the password from the session
                req.session.user = user; //refresh the session value
                res.locals.user = user;
            }
            // finishing processing the middleware and run the route
        	res.redirect('/inform');
        });
    } else {
		res.render('login', { title: 'Test' });
    }
	// next();
});

module.exports = router;
