import fetch from '@/utils/fetch'

/** 获取银行限额列表 */
export function fetchBankLimit() {
  return fetch({
    url: 'user/bankQuota',
    method: 'get'
  })
}
