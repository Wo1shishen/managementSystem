var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var obj={
	goodsname:String,
	title:String,
	price:String,
	url:String,
	type:String,
	number:String
}
var model=mongoose.model('goods',new Schema(obj));

module.exports=model;
