import axios from 'axios';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '192.168.1.196:21000/web-api';

// POST传参序列化
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, error => {
  console.log('错误的传参', 'fail');
  return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use(res => {
  if (!res.data.success) {
    // _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, error => {
  console.log('网络异常', 'fail');
  return Promise.reject(error);
});

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  /**
   * 首页轮播
   */
  IndexSwiper(params) {
    return fetch('/index', params);
  },

  /**
   * 平台数据播报
   */
  latformData(params) {
    return fetch('/platformData', params);
  },

  /**
   * 项目推荐
   */
  RecommendList(params) {
    return fetch('/recommendList/{raiseCapacity}/{raisePlanCapacity}/{normalCapacity}', params);
  },

  /**
   * 新闻中心和平台公告
   */
  PlatformInfo(params) {
    return fetch('/platformInfo/{newsCapacity}/{noticeCapacity}', params);
  },

  /**
   * 投资人风采
   */
  InvestorSaid(params) {
    return fetch('/investorSaid', params);
  },

  /**
   * 图片验证码
   */
  PicCaptcha(params) {
    return fetch('/picCaptcha/{type}', params);
  },

  /**
   * 注册
   */
  Register(params) {
    return fetch('/register', params);
  },

  /**
   * 短信验证码
   */
  GenerateRegisterAuthCode(params) {
    return fetch('/generateRegisterAuthCode', params);
  },

  /**
   * 登陆
   */
  Login(params) {
    return fetch('/login', params);
  },

  /**
   * 投资
   */
  Invest(params) {
    return fetch('/invest', params);
  },

  /**
   * 校验手机号可用性
   */
  MobileRegistVerify(params) {
    return fetch('/mobileRegistVerify/{mobile}', params);
  },

  /**
   * 计划投资主页查询
   */
  Plan(params) {
    return fetch('/plan/{id}', params);
  }
}
