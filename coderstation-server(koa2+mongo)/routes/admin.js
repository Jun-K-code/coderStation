/**
 * 管理员模块对应的二级路由
 */
const router = require('@koa/router')();

// 引入业务层方法
const {
  loginService,
  addAdminService,
  deleteAdminService,
  updateAdminService,
  findAllAdminService,
  findAdminByIdService,
  adminIsExistService,
} = require('../services/adminService');

const { formatResponse, analysisToken } = require('../utils/tools');
const { ValidationError } = require('../utils/errors');

router.prefix('/api/admin');

/**
 * 管理员登录
 */
router.post('/login', async (ctx) => {
  console.log(ctx.request.body.captcha, 'ctx.request.body.captcha');
  console.log(ctx.request.session.captcha, 'ctx.request.session.captcha');

  // 首先应该有一个验证码的验证
  if (ctx.request.body.captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
    // 如果进入此 if，说明是有问题的，用户输入的验证码不正确
    throw new ValidationError('验证码错误');
  }

  const result = await loginService(ctx.request.body);
  // 对返回数据进行格式化
  ctx.body = formatResponse(0, '', result);
});

/**
 * 管理员恢复登录
 */
router.get('/whoami', async (ctx) => {
  // 首先从请求头获取 token 字符串
  const tokenStr = ctx.request.header['Authorization'];
  if (tokenStr) {
    // 1. 从客户端请求头的 Authorization 字段拿到 token，然后进行解析
    const token = analysisToken(tokenStr);
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
  } else {
    throw new ValidationError('登录过期，请重新登录');
  }
});

/**
 * 获取所有管理员
 */
router.get('/', async (ctx) => {
  const result = await findAllAdminService();
  // 对返回数据进行格式化
  ctx.body = formatResponse(0, '', result);
});

/**
 * 新增管理员
 */
router.post('/', async (ctx) => {
  const result = await addAdminService(ctx.request.body);
  if (result && result._id) {
    ctx.body = formatResponse(0, '', result);
  } else {
    throw new ValidationError('添加失败');
  }
});

/**
 * 根据 id 删除管理员
 */
router.delete('/:id', async (ctx) => {
  const result = await deleteAdminService(ctx.params.id);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 id 查找管理员
 */
router.get('/:id', async (ctx) => {
  const result = await findAdminByIdService(ctx.params.id);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 id 修改管理员
 */
router.patch('/:id', async (ctx) => {
  const result = await updateAdminService(ctx.params.id, ctx.request.body);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 loginId 来查找该管理员是否存在
 */
router.get('/adminIsExist/:loginId', async (ctx) => {
  const result = await adminIsExistService(ctx.params.loginId);
  ctx.body = formatResponse(0, '', result);
});

module.exports = router;
