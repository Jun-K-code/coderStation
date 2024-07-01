const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const session = require('koa-session');

// const test1 = require('./routes/test1');
// const test2 = require('./routes/test2');
const adminRouter = require('./routes/admin');
const issueRouter = require('./routes/issue');
const typeRouter = require('./routes/type');
const captchaRouter = require('./routes/captcha');
const userRouter = require('./routes/user');

// 默认读取项目根目录下的 .env 环境变量文件
require('dotenv').config();
// 进行数据库初始化
require('./db/init');

onerror(app); // error handler

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// 配置 session
app.keys = [process.env.SESSION_SECRET]; // 这是用来签名 cookie 的密钥
app.use(session({
  key: 'koa:sess', // cookie key (默认是 koa:sess)
  maxAge: 86400000, // cookie 的过期时间
  httpOnly: true, // 是否仅服务器可访问 cookie
  signed: true, // 签名 cookie
  rolling: false, // 每次响应时强制设置 session
  renew: false, // 在 session 即将过期时刷新 session
}, app));

// app.use(
//   views(__dirname + '/views', {
//     extension: 'pug',
//   })
// );

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
// app.use(test1.routes(), test1.allowedMethods());
// app.use(test2.routes(), test2.allowedMethods());
app.use(adminRouter.routes(), adminRouter.allowedMethods());
app.use(issueRouter.routes(), issueRouter.allowedMethods());
app.use(typeRouter.routes(), typeRouter.allowedMethods());
app.use(captchaRouter.routes(), captchaRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// 设置跨域
// app.use(
//   cors({
//     origin: function (ctx) {
//       console.log("测试跨域", ctx);
//       if (ctx.url === '/string') {
//         return '*'; // 允许所有域名访问'/test'路由
//       }
//       return; // 其他路由不进行CORS处理
//     },
//     maxAge: 5, // 预检请求的缓存时间
//     credentials: true, // 允许发送cookies
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的HTTP请求方法
//     allowHeaders: ['Content-Type', 'Authorization'], // 允许的HTTP请求头
//   })
// );
app.use(async (ctx, next) => {
  // console.log('测试跨域', ctx);
  ctx.set('Access-Control-Allow-Origin', '*'); // 允许所有域名访问
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  ctx.set('Access-Control-Max-Age', '3600');
  ctx.set('Access-Control-Allow-Credentials', 'true');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
  } else {
    await next();
  }
});

module.exports = app;
