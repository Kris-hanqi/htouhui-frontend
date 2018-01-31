import ccap from 'ccap';

/**
 * 用户登录
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
export const login = async(ctx, next) => {
  const user = ctx.request;
  console.log(user);
  ctx.throw(401, '用户名/密码未填写123');
};

export const captcha = async(ctx, next) => {
  const captcha = ccap();
  const ary = captcha.get();
  let txt = ary[0];
  let buf = ary[1];
  ctx.body = buf;
  ctx.type = 'image/png';
};
