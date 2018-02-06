import axios from 'axios';

const service = axios.create({
  baseURL: 'https://120.27.165.213/web-api/',
  timeout: 30 * 1000
});

export default service;
