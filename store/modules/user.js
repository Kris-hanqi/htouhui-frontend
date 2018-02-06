import { fetchLoginByMobile } from '../../api/auth';

const user = {
  state: {
    token: '123'
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    }
  },
  actions: {
    // 密码登录
    LoginByPassword({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        fetchLoginByMobile(userInfo)
          .then(response => {
            resolve({ status: response.data.status });
          })
          .catch(error => reject(error));
      });
    },
    // 短信验证码登录
    LoginBySms({ commit }, userInfo) {},
  }
};

export default user;
