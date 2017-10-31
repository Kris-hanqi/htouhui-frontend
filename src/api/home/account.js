import fetch from '@/utils/fetch';

/** 获取资产统计信息 */
export function fetchAsset() {
  return fetch({
    url: 'user/investStatistics',
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

/** 获取设置交易密码请求数据 */
export function fetchTransactionPassword(data) {
  return fetch({
    url: 'user/setPwd',
    method: 'get',
    params: data
  })
}
