var express = require('express');
var db = require('../db')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

    var information = {
        message: '用户未登录',
        error: {
            status: 404,
            stack: '请登录后再试，不登录是不能查看文件的哦~'
        }
    };

    // res.render('error', information);
    console.log(req.session);
    if (req.session && typeof(req.session.user)!="undefined" && req.session.user!=null) {
        db.models.User.findOne({ username: req.session.user.username }, function(err, user) {
            if (user) {
                req.user = user;
                delete req.user.password; // delete the password from the session
                req.session.user = user; //refresh the session value
                res.locals.user = user;
            }
            // finishing processing the middleware and run the route
        	res.render('filelist', {username: user.username});
        });
    } else {
        res.render('error', information);
    }

    // next();
});

router.post('/', function(req, res, next) {

    var information = {
        message: '登录失败',
        error: {
            status: 200,
            stack: '请好好检查你的账号和密码，登录不成功哟~'
        }
    };

    db.models.User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
            res.render('error', information);
        } else {
            if (req.body.password === user.password) {

                // sets a cookie with the user's info
                req.session.user = user;
                // 这里貌似有误，只是set了session，返回这个sessionid，但但数据并不会set到这个cookie里头
                console.log(req.session);
				res.redirect('/inform');
            } else {
                res.render('error', information);
            }
        }
    });
});

module.exports = router;