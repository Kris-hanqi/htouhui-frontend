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

/**
 * 标记用户新手计划状态
 *    1、新手
 *    2、非新手参加过新手计划
 *    3、非新手未参加过新手计划
 */
function getNovicePlanStatus(data) {
  let status = null;
  if (data.isNovice) { // 新用户
    status = 1;
  } else if (data.isJoinNovicePlan) { // 老用户加入新手计划
    status = 2;
  } else {  // 老用户未加入新手计划
    status = 3;
  }

  return status;
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
    token: getToken(),                 // token
    uuid: getUuid(),                   // uuid
    username: '',                      // 用户名
    thirdPartyName: '',                // 第三方名称（空中）
    realName: '',                      // 真实姓名
    mobile: '',                        // 手机号
    status: 0,                         // 用户状态
    bankCard: '',                      // 银行卡号
    bankName: '',                      // 银行名称
    bankNo: '',                        // 银行背景
    accountId: '',                     // 电子账号
    IDNumber: '',                      // 身份证号
    email: '',                         // 电子邮箱
    lastLoginTime: '',                 // 最后登录时间
    transactionPasswordStatus: false,  // 是否设置交易密码
    isOpenAccount: false,              // 是否开户
    isJoinRiskAssessment: false,       // 是否进行过风险测评
    isTransactionPassword: false,      // 是否设置交易密码
    isBankCard: false,                 // 是否绑卡
    isAutomaticBidding: false,         // 是否自动投标授权
    isAutomaticDebtTransfer: false,    // 是否自动债转授权
    isAutomaticRepayment: false,       // 是否自动还款
    novicePlanStatus: 0,               // 新手计划状态
    isBorrower: false,                 // 是否是借款人
    largeAmount: 0,                    // 用户大额提现状态
    headImg: ''                        // 头像url
  },

  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    },
    SET_UUID: (state, data) => {
      state.uuid = data;
    },
    SET_USERNAME: (state, data) => {
      state.username = data;
    },
    SET_THIRD_PARTY_NAME: (state, data) => {
      state.thirdPartyName = data;
    },
    SET_REAL_NAME: (state, data) => {
      state.realName = data;
    },
    SET_STATUS: (state, data) => {
      state.status = data;
    },
    SET_MOBILE: (state, data) => {
      state.mobile = data;
    },
    SET_BANK_NAME: (state, data) => {
      state.bankName = data;
    },
    SET_BANK_NO: (state, data) => {
      state.bankNo = data;
    },
    SET_ACCOUNT_ID: (state, data) => {
      state.accountId = data;
    },
    SET_ID_NUMBER: (state, data) => {
      state.IDNumber = data;
    },
    SET_BANK_CARD: (state, data) => {
      state.bankCard = data;
    },
    SET_EMAIL: (state, data) => {
      state.email = data;
    },
    SET_LAST_LOGIN_TIME: (state, data) => {
      state.lastLoginTime = data;
    },
    SET_TRANSACTION_PASSWORD_STATUS: (state, data) => {
      state.transactionPasswordStatus = data;
    },
    SET_NOVICE_PLAN_STATUS: (state, data) => {
      state.novicePlanStatus = data;
    },
    SET_IS_OPEN_ACCOUNT: (state, data) => {
      state.isOpenAccount = data;
    },
    SET_IS_JOIN_RISK_ASSESSMENT: (state, data) => {
      state.isJoinRiskAssessment = data;
    },
    SET_IS_TRANSACTION_PASSWORD: (state, data) => {
      state.isTransactionPassword = data;
    },
    SET_IS_BANK_CARD: (state, data) => {
      state.isBankCard = data;
    },
    SET_IS_BORROWER: (state, data) => {
      state.isBorrower = data;
    },
    SET_IS_AUTOMATIC_BIDDING: (state, data) => {
      state.isAutomaticBidding = data;
    },
    SET_IS_AUTOMATIC_DEBT_TRANSFER: (state, data) => {
      state.isAutomaticDebtTransfer = data;
    },
    SET_IS_AUTOMATIC_REPAYMENT: (state, data) => {
      state.isAutomaticRepayment = data;
    },
    SET_LARGE_AMOUNT: (state, data) => {
      state.largeAmount = data;
    },
    SET_HEAD_IMG: (state, data) => {
      state.headImg = data;
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
            commit('SET_USERNAME', data.userId);
            commit('SET_THIRD_PARTY_NAME', data.thirdPartyName);
            commit('SET_REAL_NAME', data.realName);
            commit('SET_MOBILE', data.mobileNumber);
            commit('SET_BANK_NAME', data.bankName);
            commit('SET_BANK_NO', data.bankNo);
            commit('SET_BANK_CARD', data.bankCard);
            commit('SET_ACCOUNT_ID', data.accountId);
            commit('SET_ID_NUMBER', data.idCard);
            commit('SET_STATUS', status);
            commit('SET_TRANSACTION_PASSWORD_STATUS', data.isSetPassWord);
            commit('SET_EMAIL', data.email);
            commit('SET_LAST_LOGIN_TIME', data.lastLoginTime);
            commit('SET_NOVICE_PLAN_STATUS', getNovicePlanStatus(data));
            commit('SET_IS_BORROWER', isBorrower(data));
            commit('SET_IS_OPEN_ACCOUNT', data.isOpenAccount);
            commit('SET_IS_JOIN_RISK_ASSESSMENT', data.isJoinRiskAssessment);
            commit('SET_IS_TRANSACTION_PASSWORD', data.isSetPassWord);
            commit('SET_IS_BANK_CARD', !!data.bankCard);
            commit('SET_IS_AUTOMATIC_BIDDING', data.isAutoBidAuth);
            commit('SET_IS_AUTOMATIC_DEBT_TRANSFER', data.isAutoInvestAuth);
            commit('SET_IS_AUTOMATIC_REPAYMENT', data.isAutoRepayAuth);
            commit('SET_LARGE_AMOUNT', data.largeAmount);
            commit('SET_HEAD_IMG', data.photo);
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
