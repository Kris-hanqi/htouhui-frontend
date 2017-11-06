import fetch from '@/utils/fetch';

/** 债权转让，转入接口 */
export function debtTransfer(data) {
  return fetch({
    url: 'user/debtTransfer',
    method: 'get',
    params: data
  })
}

/** 债权转让，转出接口 */
export function transferTurnedOut(data) {
  return fetch({
    url: 'user/transferTurnedOut',
    method: 'get',
    params: data
  })
}
