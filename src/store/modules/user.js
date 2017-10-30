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

function isShowNovicePlan(data) {
  if (data.isNovice) { // 新用户
    return true;
  } else if (data.isJoinNovicePlan) {
    return true;
  } else {
    return false;
  }
}

function isShowNovicePlanMessage(data) {
  if (data.isJoinNovicePlan) {
    return true;
  }
}

const user = {
  state: {
    token: getToken(),
    name: '', // 用户姓名
    mobile: '', // 手机号
    status: 0, // 用户状态
    bankCard: '', // 银行卡号
    bankName: '', // 银行名称
    showNovicePlan: false,
    showNovicePlanMessage: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_BANK_NAME: (state, bankName) => {
      state.bankName = bankName;
    },
    SET_BANK_CARD: (state, bankCard) => {
      state.bankCard = bankCard;
    },
    SET_SHOW_NOVICE_PLAN: (state, showNovicePlan) => {
      state.showNovicePlan = showNovicePlan;
    },
    SET_SHOW_NOVICE_PLAN_MESSAGE: (state, showNovicePlanMessage) => {
      state.showNovicePlanMessage = showNovicePlanMessage;
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data.data;
          const status = getUserStatus(data);
          const showNovicePlan = isShowNovicePlan(data);
          const showNovicePlanMessage = isShowNovicePlanMessage(data);
          commit('SET_NAME', data.realName);
          commit('SET_MOBILE', data.mobileNumber);
          commit('SET_BANK_NAME', data.bankName);
          commit('SET_BANK_CARD', data.bankCard);
          commit('SET_STATUS', status);
          commit('SET_SHOW_NOVICE_PLAN', showNovicePlan);
          commit('SET_SHOW_NOVICE_PLAN_MESSAGE', showNovicePlanMessage);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
};

export default user;
