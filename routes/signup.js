var express = require('express');
var db = require('../db')
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('signup', {});
});

module.exports = router;