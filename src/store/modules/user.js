import { getUserInfo } from '@/api/login';
import { getToken } from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '', // 用户姓名
    avatar: '',
    status: 0, // 用户状态
    bankCard: '', // 银行卡号
    bankName: '' // 银行名称
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_STATUS: (state, status) => {
      state.status = status
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_TOKEN', data.token);
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
};

export default user;
