import axios from 'axios';
import BaseApi from './server-api';

// 获取后端API地址
const BaseUrl = BaseApi();

const service = axios.create({
  baseURL: BaseUrl,     // api的base_url
  timeout: 5000         // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(config => config, error => {
  console.log(error);
  return Promise.reject(error)
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;

    console.log(res);

    return response;
  },
  error => {
    console.log('api error');
    return Promise.reject(error)
  }
);

export default service;
