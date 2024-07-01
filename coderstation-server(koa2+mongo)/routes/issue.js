/**
 * 问答模块对应二级路由
 */
const router = require('@koa/router')();

// 引入业务层方法
const {
  addIssueService,
  findIssueByPageService,
  findIssueByIdService,
  updateIssueService,
  deleteIssueService,
  searchIssueByPageService,
} = require('../services/issueService');

const { formatResponse } = require('../utils/tools');

router.prefix('/api/issue');

/**
 * 根据分页获取问答信息
 */
router.get('/', async (ctx) => {
  console.log('测试ctx', ctx);
  const result = await findIssueByPageService(ctx.request.body);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 id 获取其中一个问答具体信息
 */
router.get('/:id', async (ctx) => {
  const result = await findIssueByIdService(ctx.params.id);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 新增问答
 */
router.post('/', async (ctx) => {
  const result = await addIssueService(ctx.request.body);
  if (result && result._id) {
    ctx.body = formatResponse(0, '', result);
  } else {
    next(result);
  }
});

/**
 * 根据 id 删除某一个问答
 */
router.delete('/:id', async (ctx) => {
  const result = await deleteIssueService(ctx.params.id);
  ctx.body = formatResponse(0, '', result);
});

/**
 * 根据 id 修改某一个问答
 */
router.patch('/:id', async (ctx) => {
  const result = await updateIssueService(ctx.params.id, ctx.request.body);
  ctx.body = formatResponse(0, '', result);
});

module.exports = router;
