import fetch from '@/utils/fetch'

/** 提现 */
export function fetchWithdraw(data) {
  return fetch({
    url: 'user/withdraw',
    method: 'post',
    data
  })
}
