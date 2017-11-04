import axios from 'axios';
import store from '@/store'
import BaseApi from './server-api';
import { getToken } from '@/utils/auth';

// 获取后端API地址
const BaseUrl = BaseApi();

const service = axios.create({
  baseURL: BaseUrl,     // api的base_url
  timeout: 10000         // 请求超时时间
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
    // const res = response.data;

    console.log('');

    return response;
  },
  error => {
    console.log('api error');
    return Promise.reject(error)
  }
);

export default service;
