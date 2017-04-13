// 封装对数据库的常见操作

// 链接数据库
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var setting = require('../settings/setting.js');

function _connectDB(callback){
	var url = setting.dbUrl;
	MongoClient.connect(url,function(err,db){
		if(err){
			callback('数据库连接失败',null);
			return;
		}
		if(callback){
			callback(err,db);
		}
	})
}
// 往数据库插入一条信息
exports.insertOne = function(collectionName,json,callback){
	// 连接数据库
	_connectDB(function(err,db){
		db.collection(collectionName).insertOne(json,function(err,result){
			callback(err,result);
			db.close();
		})
	})
}
//查找数据,找到所有数据
//必传参数collectionName json callback
//args 是个对象  args--->{'pageamount':10,'page':4}
exports.find = function(collectionName,json,C,D){
	// 结果数组
	var result = [];
	// 判断参数个数,
	if(arguments.length == 3){
		var callback = C;
		var skipNum = 0;
		var limit = 0;
	}else if(arguments.length == 4){
		var callback = D;
		var args = C;
		var skipNum = args.pageamount * args.page;
		var limit = args.pageamount;
	}else{
		throw new Error("find 函数是3个或者4个");
	}
	_connectDB(function(err,db){
		var cursor = db.collection(collectionName).find(json).skip(skipNum).limit(limit);
		cursor.each(function(err,doc){
			if(doc != null){
				result.push(doc);
			}else{
				callback(null,result);
				db.close();
			}
		})
	})
} 

// 删除
exports.deleteMany = function (collectionName,json,callback) {
	_connectDB(function(err,db){
		db.collection(collectionName).deleteMany(json,function(err,results){
			callback(err,results);
			db.close();
		})
	})
}
// 修改
// json1 查找条件
// json2 修改条件
exports.updateMany = function(collectionName,json1,json2,callback){
	_connectDB(function(err,db){
		db.collection(collectionName).updateMany(
			json1,
			json2,
			function(err,results){
				if(err){
					callback("数据库修改出错",null);
					db.close();
					return;
				}
				callback(null,results);
				db.close();
			})
	})
}

