var express = require("express");
var router = express.Router();
var goods = require("../model/goods");
var fs=require("fs")

var multer = require("multer");
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "public/images/maingoodslist");
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
})
var upload = multer({
	storage: storage
})

router.get('/', function(req, res, next) {
	res.render("addgoods", {
		title: '欢迎来到管理页面/商品更改页',
		isShow: false
	})
});

router.post('/', upload.single('pic'), function(req, res, next) {
	function check(data) {
		var errors = "";
		for(attar in data) {
			if(attar == "图片") {
				var box = /script/;
				if(box.test(data[attar]) != false) {
					return res.render("addgoods", {
						title: '欢迎来到管理页面/商品更改页',
						isShow: true,
						err: '文件名含有敏感字符'
					})
				}
			}
			if(data[attar] == "" || data[attar] == undefined) {
				errors += attar + " "
			}
		};
		if(errors == "") {
			create()
		} else {
			res.render("addgoods", {
				title: '欢迎来到管理页面/商品更改页',
				isShow: true,
				err: errors + "不能为空"
			})
		}
	}

	function create() {
		goods.create({
			goodsname: req.body.goodsname,
			title: req.body.title,
			price: req.body.price,
			type: req.body.type,
			number: req.body.number,
			url: `/images/maingoodslist/${req.file.filename}`
		}).then(result => {
			res.redirect('/')
		})
	}
	
	goods.find({
		type: req.body.type,
		number: req.body.number
	}).then(result => {
		console.log("b")
		if(result.length == 0) {
			console.log("c")
			check({
				"商品名": req.body.goodsname,
				"详细介绍": req.body.title,
				"价格": req.body.price,
				"存放类型": req.body.type,
				"存放编号": req.body.number,
				"图片": req.file.filename
			})
			}else {
					fs.unlink('./public/images/maingoodslist/'+req.file.filename)
					res.render("addgoods", {
					title: '欢迎来到管理页面/商品更改页',
					isShow: true,
					err: '商品类别及编号重复，请先删除相关商品'
				})
			}
	})
})

module.exports = router;