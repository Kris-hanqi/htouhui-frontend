import { getUserInfo } from 'api/login';
import { getToken, getUuid } from 'utils/auth';

function getUserStatus(data) {
  if (!data.isOpenAccount) { // 用户未开户
    return 0;
  }

  if (!data.isSetPassWord) { // 用户未设置交易密码
    return 1;
  }

  if (!data.bankCard) { // 用户未绑卡
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

function isBorrower(data) {
  let returnData = false;
  const result = data.roles.find(v => v === 'LOANER');

  if (result) {
    returnData = true;
  }

  return returnData;
}

const user = {
  state: {
    token: getToken(),
    uuid: getUuid(),
    username: '',
    realName: '',
    mobile: '',
    status: 0, // 用户状态
    bankCard: '', // 银行卡号
    bankName: '', // 银行名称
    accountId: '', // 电子账号
    IDNumber: '',
    email: '', // 电子邮箱
    transactionPasswordStatus: false, // 是否设置交易密码
    isAutomaticBidding: false, // 是否自动投标授权
    isAutomaticDebtTransfer: false, // 是否自动债转授权
    isAutomaticRepayment: false, // 是否自动还款
    showNovicePlan: false,
    showNovicePlanMessage: true,
    isBorrower: false // 是否是借款人
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UUID: (state, uuid) => {
      state.uuid = uuid;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_REAL_NAME: (state, realName) => {
      state.realName = realName;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_BANK_NAME: (state, bankName) => {
      state.bankName = bankName;
    },
    SET_ACCOUNT_ID: (state, accountId) => {
      state.accountId = accountId;
    },
    SET_ID_NUMBER: (state, IDNumber) => {
      state.IDNumber = IDNumber;
    },
    SET_BANK_CARD: (state, bankCard) => {
      state.bankCard = bankCard;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_TRANSACTION_PASSWORD_STATUS: (state, status) => {
      state.transactionPasswordStatus = status;
    },
    SET_SHOW_NOVICE_PLAN: (state, showNovicePlan) => {
      state.showNovicePlan = showNovicePlan;
    },
    SET_SHOW_NOVICE_PLAN_MESSAGE: (state, showNovicePlanMessage) => {
      state.showNovicePlanMessage = showNovicePlanMessage;
    },
    SET_IS_BORROWER: (state, isBorrower) => {
      state.isBorrower = isBorrower;
    },
    SET_IS_AUTOMATIC_BIDDING: (state, isAutomaticBidding) => {
      state.isAutomaticBidding = isAutomaticBidding;
    },
    SET_IS_AUTOMATIC_DEBT_TRANSFER: (state, isAutomaticDebtTransfer) => {
      state.isAutomaticDebtTransfer = isAutomaticDebtTransfer;
    },
    SET_IS_AUTOMATIC_REPAYMENT: (state, isAutomaticRepayment) => {
      state.isAutomaticRepayment = isAutomaticRepayment;
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (response.data.meta.code === 200) {
            const data = response.data.data;
            const status = getUserStatus(data);
            const showNovicePlan = isShowNovicePlan(data);
            const showNovicePlanMessage = isShowNovicePlanMessage(data);
            commit('SET_USERNAME', data.userId);
            commit('SET_REAL_NAME', data.realName);
            commit('SET_MOBILE', data.mobileNumber);
            commit('SET_BANK_NAME', data.bankName);
            commit('SET_BANK_CARD', data.bankCard);
            commit('SET_ACCOUNT_ID', data.accountId);
            commit('SET_ID_NUMBER', data.idCard);
            commit('SET_STATUS', status);
            commit('SET_TRANSACTION_PASSWORD_STATUS', data.isSetPassWord);
            commit('SET_EMAIL', data.email);
            commit('SET_SHOW_NOVICE_PLAN', showNovicePlan);
            commit('SET_SHOW_NOVICE_PLAN_MESSAGE', showNovicePlanMessage);
            commit('SET_IS_BORROWER', isBorrower(data));
            commit('SET_IS_AUTOMATIC_BIDDING', data.isAutoBidAuth);
            commit('SET_IS_AUTOMATIC_DEBT_TRANSFER', data.isAutoInvestAuth);
            commit('SET_IS_AUTOMATIC_REPAYMENT', data.isAutoRepayAuth);
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
};

export default user;
