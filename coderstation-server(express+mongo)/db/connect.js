/**
 * 该文件负责连接数据库
 */

const mongoose = require('mongoose');

// 定义链接数据库字符串
const dbURI = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME;

// 连接
// useNewUrlParser配置是使用新的解析去解析dbURI字符串
// useUnifiedTopology配置是指定使用新的方式，来发现数据库，来使用数据库的监视引擎
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// 监听
mongoose.connection.on('connected', function () {
    console.log(`coderstation 数据库已经连接...`);
});
