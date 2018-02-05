import ccap from 'ccap';

/**
 * 用户登录
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
export const login = async(ctx, next) => {
  console.log(ctx);
  console.log(ctx.request.body);
  ctx.body = {
    status: '200',
    data: {
      token: 'token1234'
    }
  }
};

export const captcha = async(ctx, next) => {
  const captcha = ccap();
  const ary = captcha.get();
  let txt = ary[0];
  let buf = ary[1];
  ctx.body = buf;
  ctx.type = 'image/png';
};
