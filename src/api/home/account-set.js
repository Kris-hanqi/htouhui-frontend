import fetch from '@/utils/fetch';

/** 银行卡解除绑定 */
export function fetchUnlockBankCard() {
  return fetch({
    url: 'user/unbinding',
    method: 'get'
  })
}

export function fetchBindEmail(data) {
  return fetch({
    url: 'user/bindEmail',
    method: 'post',
    data
  })
}



