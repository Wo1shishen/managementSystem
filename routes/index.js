var express = require('express');
var router = express.Router();
var goods = require('../model/goods');
var users = require('../model/users')
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {

	if(req.session.userID) {
		users.find({
			user: req.session.userID["username"]
		}).then(result => {
			res.render('index', {
				title: '后台管理系统',
				name: req.cookies["currentUser"]
			});
		})

	} else {
		res.redirect("/login"); //重新登录
	}

});

router.post('/remove', function(req, res, next) {
	obj = {
		goodsname: req.body.goodsname,
		title: req.body.title,
		price: req.body.price,
		number: req.body.number,
		type: req.body.type
	};
	goods.find(obj).then(result => {
		if(result.length == 1) {
			fs.unlink('./public/' + result[0].url);
			goods.remove(obj).then(function() {
				res.send(true)
			})
		} else {
			res.send(false)
		}
	})
});
router.post('/', function(req, res, next) {
	goods.find().then(result => {
		res.send(result)
	})
});

router.get('/detail', function(req, res, next) {
	console.log(req.query.num,req.query.type)
	if(req.query.num && req.query.type) {
		console.log("a")
		goods.find({
			number:req.query.num,
			type:req.query.type
		}).then(result => {
			console.log(result.length)
			if(result.length == 1) {
				console.log("c")
				res.render('detail', {
					title: '后台管理系统',
					name: req.cookies["currentUser"],
					goodsname:result[0].goodsname,
					title:result[0].title,
					price:result[0].price,
					pic:result[0].url					
				})
			}else{
				send("内部发生错误")
			}
		})
	} else {
		res.send("非法访问")
	}
})

router.get("/logout", function(req, res) {
	req.session.destroy(() => {

		res.redirect("/login");
	})
})

module.exports = router;