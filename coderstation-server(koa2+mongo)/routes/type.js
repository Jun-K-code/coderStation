/**
 * 类型模块对应的二级路由
 */

const router = require('@koa/router')();

const {
  findAllTypeService,
  addTypeService,
  deleteTypeService,
  updateTypeService,
} = require('../services/typeService');

const { formatResponse } = require('../utils/tools');

router.prefix('/api/type');

/**
 * 查找所有类型
 */
router.get('/', async (ctx) => {
  const result = await findAllTypeService();
  // 对返回数据进行格式化
  ctx.body = formatResponse(0, "", result);
  // ctx.body = 'this is a /api/type response';
});

/**
 * 新增类型
 */
router.post('/', async (ctx) => {
  const result = await addTypeService(ctx.request.body);
  if (result && result._id) {
    ctx.body = formatResponse(0, '', result);
  } else {
    next(result);
  }
});

/**
 * 根据 id 删除类型
 */
router.delete('/:id', async (ctx) => {
  const result = await deleteTypeService(ctx.params.id);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 id 修改类型
 */
router.patch('/:id', async (ctx) => {
  const result = await updateTypeService(ctx.params.id, ctx.request.body);
  ctx.body = formatResponse(0, '', result);
});

module.exports = router;
