import Mock from 'mockjs';
import loginAPI from './login';
import accountAPI from './account';

Mock.setup({
  timeout: '350-600'
});

// 登录相关
Mock.mock(/\/loginByPassword/, 'post', loginAPI.login);
Mock.mock(/\/user\/userInfo/, 'get', loginAPI.userInfo);

// 账户概览
Mock.mock(/\/user\/investStatistics/, 'get', accountAPI.investStatistics);

export default Mock;
