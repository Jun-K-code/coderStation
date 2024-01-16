const { createProxyMiddleware } = require('http-proxy-middleware');

// 使用node的一个中间件
module.exports = function (app) {
    app.use(
        createProxyMiddleware(['/res', '/api', '/static'], {
            target: 'http://127.0.0.1:7001',
            changeOrigin: true,
        })
    );
};
