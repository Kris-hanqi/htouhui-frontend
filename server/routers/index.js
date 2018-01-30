import config from '../config';
import Router from 'koa-router';

const router = new Router({
  prefix: config.app.baseApi
});

const user = require('../controllers/user');

router
  .get('/login', user.login)
  .get('/captcha', user.captcha);

export default router;
