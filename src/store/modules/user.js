import { getUserInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '', // 用户名
    avatar: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
};
