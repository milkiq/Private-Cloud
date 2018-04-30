var express = require('express');
var db = require('../db')
var router = express.Router();

router.post('/', function(req, res, next) {

    var information = {
        message: '注册失败',
        error: {
            status: 200,
            stack: '有人使用了这个用户名了哟~'
        }
    };

    db.models.User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
        	var data = {
        		username: req.body.username,
        		password: req.body.password
        	}
        	db.models.User.create(data, function (err) {
        		if(err){
        			console.log(err);
        			information.error = err;
            		res.render('error', information);
            	}else{
            		console.log("save ok!");
                    res.render('message',{
                        message: '注册成功',
                        url: '/login'
                    });
            		// res.redirect('/login');
            	}
        	})
        } else {
            res.render('error', information);
        }
    });
});

module.exports = router;