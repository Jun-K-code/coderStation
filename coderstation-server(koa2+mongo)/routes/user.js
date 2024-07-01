/**
 * 用户对应的二级路由
 */
const router = require('@koa/router')();

// 引入业务层方法
const {
  loginService,
  addUserService,
  deleteUserService,
  updateUserService,
  findUserByPageService,
  findUserByIdService,
  userIsExistService,
  passwordcheckService,
  findUserByPointsRankService,
} = require('../services/userService');
const { formatResponse, analysisToken } = require('../utils/tools');
const { ValidationError } = require('../utils/errors');

router.prefix('/api/user');

/**
 * 用户登录
 */
router.post('/login', async (ctx) => {
  console.log(ctx.request.body.captcha, 'ctx.request.body.captcha');
  console.log(ctx.session.captcha, 'ctx.session.captcha');

  // 首先应该有一个验证码的验证
  if (ctx.request.body.captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
    // 如果进入此 if，说明是有问题的，用户输入的验证码不正确
    next(new ValidationError('验证码错误'));
    return;
  }
  const result = await loginService(ctx.request.body);
  // 对返回数据进行格式化
  ctx.body = formatResponse(0, '', result);
});

/**
 * 用户恢复登录
 */
router.get('/whoami', async (ctx) => {
  // 1. 从客户端请求头的 Authorization 字段拿到 token，然后进行解析
  const token = analysisToken(ctx.get('Authorization'));
  // 查看解析 token 是否成功
  if (token) {
    // 2. 返回给客户端解析结果
    ctx.body = formatResponse(0, '', {
      _id: token._id,
      loginId: token.loginId,
    });
  } else {
    throw new ValidationError('登录过期，请重新登录');
  }
});

/**
 * 根据分页查找用户
 */
router.get('/', async (ctx) => {
  const result = await findUserByPageService(ctx.query);
  // 对返回数据进行格式化
  ctx.body = formatResponse(0, '', result);
});

router.get('/pointsrank', async (ctx) => {
  const result = await findUserByPointsRankService();
  // 对返回数据进行格式化
  ctx.body = formatResponse(0, '', result);
});

/**
 * 新增用户（用户注册）
 */
router.post('/', async (ctx) => {
  // 首先应该有一个验证码的验证
  // 但是如果是后台系统新增，则不需要验证码
  if (
    ctx.body.type !== 'background' &&
    ctx.body.captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()
  ) {
    // 如果进入此 if，说明是有问题的，用户输入的验证码不正确
    next(new ValidationError('验证码错误'));
    return;
  }
  const result = await addUserService(ctx.body);
  if (result && result._id) {
    ctx.body = formatResponse(0, '', result);
  } else {
    // next(result);
  }
});

/**
 * 根据 id 删除用户
 */
router.delete('/:id', async (ctx) => {
  const result = await deleteUserService(ctx.params.id);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 id 查找用户
 */
router.get('/:id', async (ctx) => {
  const result = await findUserByIdService(ctx.params.id);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 id 修改用户
 */
router.patch('/:id', async (ctx) => {
  const result = await updateUserService(ctx.params.id, ctx.body);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 loginId 来查找用户是否存在
 */
router.get('/userIsExist/:loginId', async (ctx) => {
  const result = await userIsExistService(ctx.params.loginId);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 确认密码是否正确
 */
router.post('/passwordcheck', async (ctx) => {
  const result = await passwordcheckService(req.body);
  ctx.body = formatResponse(0, '', result);
});

module.exports = router;
