import fetch from '@/utils/fetch'

/** 获取我的资产 */
export function fetchAsset() {
  return fetch({
    url: 'user/investStatistics',
    method: 'get'
  })
}

/** 还款日历 */
export function fetchRepayCalendar(data) {
  return fetch({
    url: 'user/repayCalendar',
    method: 'get',
    data
  })
}

