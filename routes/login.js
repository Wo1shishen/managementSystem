var express = require("express");
var router = express.Router();
var User = require("../model/users");
var md5 = require("md5");

router.get('/', function(req, res, next) {
	res.render('login', {
		isShow: false
	});
});

router.post("/", function(req, res, next) {
	if(req.body.username && req.body.password) {
		User.find({
			username: req.body.username,
			password: md5(req.body.password)
		}).then(result => {
			if(result == 0) {
				User.find({
					email: req.body.username,
					password: md5(req.body.password)
				}).then(result => {
					if(result == 0) {
						res.render('login', {
							isShow: true
						})
					} else {
						req.session.userID = result[0];
						res.cookie("currentUser", result[0].username)
						res.redirect("/")
					}
				})
			} else {
				req.session.userID = result[0];
				res.cookie("currentUser", result[0].username)
				res.redirect("/")
			}
		})
	}
})

module.exports = router;