import axios from 'axios';
import store from '@/store';
import { MessageBox } from 'element-ui'
import BaseApi from './server-api';
import { getToken } from 'utils/auth';
import { getLocationUrl } from './index';
import errorCode from './error-code';

let openModalStatus = false;

// 获取后端API地址
const BaseUrl = BaseApi();

const service = axios.create({
  baseURL: BaseUrl,     // api的base_url
  timeout: 30 * 1000       // 请求超时时间 30S
});

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token && config.url !== '/web-api/loginByPassword') {
    config.headers['token'] = getToken();  // eslint-disable-line
  }
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error)
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    const data = response.data;
    // 用户未登录 / 登录失效
    if (data.meta.code === errorCode.ESS_USER_IS_NOT_LOGIN) {
      if (!openModalStatus) {
        openModalStatus = true;
        MessageBox.alert('登录超时，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              window.open(getLocationUrl() + '/logout');
            } else {
              done();
            }
          }
        });
      }
    }

    return response;
  },
  error => {
    console.log('api error');
    return Promise.reject(error)
  }
);

export default service;
