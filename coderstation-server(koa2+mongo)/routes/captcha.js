const router = require('@koa/router')();

const { getCaptchaService } = require('../services/captchaService');
const { formatResponse } = require('../utils/tools');

router.prefix('/res/captcha');

// 返回验证码
router.get('/', async (ctx) => {
  const captcha = await getCaptchaService(); // 生成一个验证码
  ctx.session.captcha = captcha.text; // 将生成的验证码保存至 session
  ctx.set('Content-Type', 'image/svg+xml'); // 设置响应头
  ctx.body = captcha.data; // 将验证码返回给客户端
});

module.exports = router;
