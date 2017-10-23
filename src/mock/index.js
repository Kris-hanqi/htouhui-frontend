import Mock from 'mockjs';
import loginAPI from './login';

Mock.setup({
  timeout: '350-600'
});

// 登录相关
Mock.mock(/\/loginByPassword/, 'post', loginAPI.login);

export default Mock;
