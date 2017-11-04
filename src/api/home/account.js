import fetch from '@/utils/fetch';

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

/** 充值接口 - 获取请求银行数据 */
export function fetchRecharge(data) {
  return fetch({
    url: 'user/recharge',
    method: 'post',
    data
  })
}

/** 获取设置交易密码请求数据 */
export function fetchTransactionPassword(data) {
  return fetch({
    url: 'user/setPwd',
    method: 'get',
    params: data
  })
}
