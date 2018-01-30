import Router from 'koa-router';

const router = Router({
  prefix: '/api'
});

router.get('/login', async function getAuth(ctx) {
  const user = ctx.request.body;
  console.log(user);
  ctx.throw(401, '用户名/密码未填写');
});

export default router.routes();
