import Mock from 'mockjs';
import loginAPI from './login';
import accountAPI from './home/account';
import couponAPI from './home/coupon';

Mock.setup({
  timeout: '350-600'
});

// 登录相关
Mock.mock(/\/loginByPassword/, 'post', loginAPI.login);
Mock.mock(/\/user\/userInfo/, 'get', loginAPI.userInfo);

// 账户概览
Mock.mock(/\/user\/investStatistics\b/, 'get', accountAPI.assetStatistics);
Mock.mock(/\/user\/investStatisticsChart\b/, 'get', accountAPI.investStatistics);

// 优惠券
Mock.mock(/\/user\/queryUserCouponRecord/, 'get', couponAPI.getPageList);

export default Mock;
