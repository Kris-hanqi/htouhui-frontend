import axios from 'axios';

// 自动携带cookie信息
axios.defaults.withCredentials = true;

const service = axios.create({
  baseURL: '/api/',       // api的base_url
  timeout: 30 * 1000         // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(config => {
  console.log(config);
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log(response);

    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
