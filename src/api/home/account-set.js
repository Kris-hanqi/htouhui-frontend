import fetch from '@/utils/fetch';

/** 银行卡解除绑定 */
export function fetchUnlockBankCard() {
  return fetch({
    url: 'user/unbinding',
    method: 'get'
  })
}

/**
 * 修改登录密码
 * @param data
 *   type: Object
 *   examples: { oldPassword: '123456', newPassword: '123abc'}
 */
export function fetchUpdatePassword(data) {
  return fetch({
    url: 'user/modifyPassword',
    method: 'get',
    params: data
  })
}


