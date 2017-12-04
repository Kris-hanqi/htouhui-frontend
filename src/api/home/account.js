import fetch from 'utils/fetch';

/** 上传头像 */
export function feachUploadAvatar(data) {
  return fetch({
    url: 'user/uploadHeadSculpture',
    method: 'post',
    data
  })
}

/** 获取资产统计信息 */
export function fetchAsset() {
  return fetch({
    url: 'user/investStatistics',
    method: 'get'
  })
}

/** 获取我的投资数据 */
export function fetchInvest() {
  return fetch({
    url: 'user/investStatisticsChart',
    method: 'get'
  })
}

/**
 * 还款日历
 * @param data
 *   type: Object
 *   examples: { month: '2017-10' }
 */
export function fetchRepayCalendar(data) {
  return fetch({
    url: 'user/repayCalendar',
    method: 'get',
    params: data
  })
}

/** 获取资金流水 */
export function fetchFundsPageList(data) {
  return fetch({
    url: 'user/newUserBill',
    method: 'get',
    params: data
  })
}

/** 充值 - 获取请求银行数据 */
export function fetchRecharge(data) {
  return fetch({
    url: 'user/recharge',
    method: 'post',
    data
  })
}

/** 获取账户可用余额 -- 充值/提现 */
export function fetchAccountMoney() {
  return fetch({
    url: 'user/banlance',
    method: 'get'
  })
}

/** 获取充值费用 */
export function fetchBalanceCost(data) {
  return fetch({
    url: 'user/calculateRechargeFee',
    method: 'get',
    params: data
  })
}

/** 查询是否允许大额提现 */
export function fetchAllowLargeWithdraw(data) {
  return fetch({
    url: 'user/largeWithdrawals',
    method: 'get',
    params: data
  })
}

/** 提现 */
export function fetchWithdraw(data) {
  return fetch({
    url: 'user/withdraw',
    method: 'post',
    data
  })
}

/** 获取提现费用 */
export function fetchWithdrawCost(data) {
  return fetch({
    url: 'user/calculateFee',
    method: 'get',
    params: data
  })
}

/** 获取省 */
export function fetchGetProvince() {
  return fetch({
    url: 'user/province',
    method: 'get'
  })
}

/** 获取市 */
export function fetchGetCity(data) {
  return fetch({
    url: 'user/city',
    method: 'get',
    params: {
      province: data
    }
  })
}

/** 获取联行号 */
export function fetchGetUnionBank(data) {
  return fetch({
    url: 'user/cnapsNo',
    method: 'get',
    params: data
  })
}
