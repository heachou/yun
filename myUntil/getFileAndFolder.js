const fs = require('fs');

var getAllFolersAndFiles = (function() {
    function iterator(url, folders, files) {
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            folders.unshift(url); //收集目录
            inner(url, folders, files);
        } else if (stat.isFile()) {
            files.unshift(url); //收集文件
        }
    }

    function inner(path, folders, files) {
        var arr = fs.readdirSync(path);
        for (var i = 0, el; el = arr[i++];) {
            iterator(path + "/" + el, folders, files);
        }
    }
    return function(dir,cb) {
        var folders = [],
            files = [];
        try {
            iterator(dir, folders, files);
        } catch (e) {
            console.log("enter");
        	cb(e,null);
        } finally {
            return cb(null,{
                "folders": folders,
                "files": files
            })
        }
    }
})()
module.exports = getAllFolersAndFiles;
