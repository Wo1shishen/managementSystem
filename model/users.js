var mongoose = require('mongoose');

var Schema=mongoose.Schema;

var obj={
	qq:String,
	email:String,
	username:String,
	password:String,
	date:String,
}

var model=mongoose.model('users',new Schema(obj));

module.exports=model
