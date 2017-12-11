var express = require("express");
var router = express.Router();
var Users = require('../model/users');
var md5=require("md5");
router.get('/', function(req, res, next) {
	res.render('register');
});

router.post('/', function(req, res, next) {
	function check(data) {
		Users.find(data).then(result => {
			if(result.length == 0) {
				res.send(true)
			} else {
				res.send(false)
			}
		})
	};
	var box1=/^[0-9]{8,12}$/;
	var box2=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	var box3=/^[a-zA-Z0-9]{3,15}$/;
	var bstop1=box1.test(req.body.qq);
	var bstop2=box2.test(req.body.email);
	var bstop3=box3.test(req.body.username);
	
	if(req.body.qq && req.body.email && req.body.username && req.body.password && bstop1 && bstop2 &&bstop3) {
		Users.find({
			qq: req.body.qq
		}).then(result => {
			if(result == 0) {
				Users.find({
					email: req.body.email
				}).then(result => {
					if(result == 0) {
						Users.find({
							username: req.body.username
						}).then(result => {
							if(result == 0){
								Users.create({
									qq:req.body.qq,
									email:req.body.email,
									username:req.body.username,
									password:md5(req.body.password),
									date:Date.now()
								}).then(result=>{
									res.redirect("login")
								})
							}
						})
					}
				})
			}
		})

	} else if(req.body.qq) {
		check({
			qq: req.body.qq
		})
	} else if(req.body.email) {
		check({
			email: req.body.email
		})
	} else if(req.body.username) {
		check({
			username: req.body.username
		})
	}
})
module.exports = router;