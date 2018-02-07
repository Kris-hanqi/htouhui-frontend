import ccap from 'ccap';
import userDao from '../dao/userDao';

/**
 * 用户密码登录
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
export const loginByPassword = async(ctx, next) => {
  console.log(ctx);
  console.log(ctx.request.body);
  // 调取dao层
  const body = await userDao.loginByPassword({userPhone: "MTExMDQxOTExMjM=", userPassword: "MTIzYWJj"})
    .then(response => {
      return response.data;
    });

  ctx.body = body;
};

export const captcha = async(ctx, next) => {
  const captcha = ccap();
  const ary = captcha.get();
  let txt = ary[0];
  let buf = ary[1];
  ctx.body = buf;
  ctx.type = 'image/png';
};
