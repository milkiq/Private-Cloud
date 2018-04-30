var mongoose = require("mongoose"); //引入mongoose

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    var UserSchema = new mongoose.Schema({
        username: String, //定义一个属性username，类型为String
        password: String, //定义一个属性password，类型为String
    });

    mongoose.model('User', UserSchema); //将该Schema发布为Model


    UserSchema.statics.findOne = function(data, callback) {
        return this.model('mongoose').find(data, callback);
    }
    console.log('connected!');
});

mongoose.connect('mongodb://localhost:27017/ycloud'); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017  
module.exports = mongoose;