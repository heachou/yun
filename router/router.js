const fs = require('fs');
var path = require('path');
// 密码加密
const crypto = require('crypto');
// 
var db = require('../model/db.js');
var deleteFile = require('../myUntil/deleteFolder.js');
var getAllFile = require('../myUntil/getFileAndFolder.js');

exports.showLogin = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // 数据库查找
    db.find('user',{"username":username},function(err,result){
    	if(err){
    		console.log(err);
    		return;
    	}
    	if(result.length == 0){
    		//没有该用户名
    		res.json({
				success:0,
				msg:'该用户名不存在'
			})
			return;
    	}
    	if(result[0].username == username){//用户名相同
    		// 比对密码
            var md5 = crypto.createHash('md5');
            var passwordByMd5 = md5.update(password).digest('hex');
    		if(result[0].password == passwordByMd5){//密码一致
                req.session.login = 1;
                req.session.username = username;
    			if(req.cookies.isVisit){//判断是第几次登录 
    				console.log("二次登录");	
    			}else{
    				res.cookie('isVisit', 1, {maxAge: 60 * 1000});
    			}
    			res.json({
    				success:1,
    				msg:'允许登录'
    			})
    			return;
    		}else{
    			res.json({
    				success:0,
    				msg:'密码错误'
    			})
    			return;
    		}
    	}
    })
}
exports.showReg = (req, res) => {
    // 得到注册信息
    var username = req.body.username;
    var password = req.body.password;
    // 数据库查找
    db.find('user', { "username": username }, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result.length == 0) { //该用户名未注册
            // 将注册信息插入数据库中
            var md5 = crypto.createHash('md5');
            db.insertOne('user', {
                "username": username,
                "password": md5.update(password).digest('hex'),
                "creatAt": new Date()
            }, function(err, result) {
                if (err) {
                    res.json(err)
                    return;
                }
                res.json({
                    success: 1,
                    msg: "允许注册"
                })
                return;
            })
        }
        if (result.length != 0) { //已经存在该用户名
            res.json({
                success: 0,
                msg: "用户名已经存在"
            })
        }
    })
}
exports.getFileList = (req, res) => {
    var path1 = './uploads';
    fs.readdir(path1, function(err, files) {
        if (err) {
            console.log(err);
            res.json({
                success: 0
            })
            return;
        }
        //存在文件或者文件夹
        var fileArray = [];
        var folderArray = [];
        // 迭代器
        (function iterator(x) {
            if (x == files.length) {
                res.json({
                    success: 1,
                    list: {
                        "fileArray": fileArray,
                        "folderArray": folderArray,
                    }
                })
                return;
            }
            fs.stat(path1 + '/' + files[x], (err, stats) => {
                if (err) {
                    console.log(err);
                    res.end('wrong');
                    return;
                }
                // 文件创建时间
                var birth = new Date(stats.birthtime);
                var birthTime = birth.getFullYear() + '-' + (birth.getMonth() + 1) + "-" + birth.getDate();
                if (stats.isFile()) {
                    fileArray.push({
                        type: 'file',
                        name: files[x],
                        path: path.normalize(__dirname + "/../uploads/" + files[x]),
                        extName: path.extname(path + '/' + files[x]),
                        birth: birthTime,
                        checked:false  //所有的input都不选中
                    })
                } else {
                    folderArray.push({
                        type: 'folder',
                        name: files[x],
                        path: path.normalize(__dirname + "/../uploads/" + files[x]),
                        extName: '',
                        birth: birthTime,
                        checked:false
                    })
                }
                iterator(x + 1);
            });
        })(0)
    })
}

exports.getFileByClickFolder = (req, res) => {
    var path1 = path.normalize(req.body.folderRouter);
    var folderName = path1.split('uploads\\')[1];
    console.log(path1);
    fs.readdir(path1, function(err, files) {
        if (err) {
            console.log(err);
            res.json({
                success: 0
            })
            return;
        }
        //存在文件或者文件夹
        var fileArray = [];
        var folderArray = [];
        // 迭代器
        (function iterator(x) {
            if (x == files.length) {
                res.json({
                    success: 1,
                    list: {
                        "fileArray": fileArray,
                        "folderArray": folderArray,
                    }
                })
                return;
            }
            fs.stat(path1 + '/' + files[x], (err, stats) => {
                if (err) {
                    console.log(err);
                    res.end('wrong');
                    return;
                }
                // 文件创建时间
                var birth = new Date(stats.birthtime);
                var birthTime = birth.getFullYear() + '-' + (birth.getMonth() + 1) + "-" + birth.getDate();
                if (stats.isFile()) {
                    fileArray.push({
                        type: 'file',
                        name: files[x],
                        path: path.normalize(__filename + "/../../uploads/" + folderName + "/" + files[x]),
                        extName: path.extname(path1 + '/' + files[x]),
                        birth: birthTime
                    })
                } else {
                    folderArray.push({
                        type: 'folder',
                        name: files[x],
                        path: path.normalize(__filename + "/../../uploads/" + folderName + "/" + files[x]),
                        extName: '',
                        birth: birthTime
                    })
                }
                iterator(x + 1);
            });
        })(0)
    })
}
exports.dodeleteFile = (req,res) => {
    var fileArray = req.body.fileArray;
    (function delelteAllFile(i){
        if(i == fileArray.length){
            res.json({success:1});
            return;
        }
        deleteFile.rmdirSync(fileArray[i],function(err,cb){
            if(err){
                return console.log(err);
            }
            delelteAllFile(i+1);
        });

    })(0)
}

exports.downloadFile = (req,res) => {
    var downloadFile = req.body.downloadFile;
    getAllFile(downloadFile[0],function(err,result){
        if(err){
            return console.log(err);
        }
        res.download(result.files[0], function(err){
          if (err) {
            return console.log(err);
          } else {
            console.log("下载成功");
            // decrement a download credit, etc.
          }
        });
    });
}

exports.testDownload = (req,res) => {
    res.download('E:\\ZHOUHAI\\yun\\uploads\\1 - 副本.png');
}