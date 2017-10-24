import { getUserInfo } from '@/api/login';
import { getToken } from '@/utils/auth';

function getUserStatus(data) {
  if (!data.isOpenAccount) { // 用户未开户
    return 0;
  }

  if (!data.isSetPassWord) { // 用户未设置交易密码
    return 1;
  }

  if (!data.bankCard) { // 用户未设置交易密码
    return 2;
  }

  return 3;
}

const user = {
  state: {
    token: getToken(),
    name: '', // 用户姓名
    status: 0, // 用户状态
    bankCard: '', // 银行卡号
    bankName: '' // 银行名称
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_BANK_NAME: (state, bankName) => {
      state.bankName = bankName;
    },
    SET_BANK_CARD: (state, bankCard) => {
      state.bankCard = bankCard;
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data.data;
          const status = getUserStatus(data);
          commit('SET_NAME', data.realName);
          commit('SET_BANK_NAME', data.bankName);
          commit('SET_BANK_CARD', data.bankCard);
          commit('SET_STATUS', status);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
};

export default user;
