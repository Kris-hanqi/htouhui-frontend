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
    // 用户名登录
    LoginByMobile({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        fetchLoginByMobile(userInfo).then(response => {
          console.log('********************');
          console.log(response);
          console.log('********************');
          resolve({ status: response.data.status });
        }).catch(error => reject(error));
      });
    },
  }
};

export default user;
