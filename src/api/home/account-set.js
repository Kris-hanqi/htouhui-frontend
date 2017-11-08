import fetch from 'utils/fetch';

/** 绑定银行卡 */
export function fetchUnlockBankCard() {
  return fetch({
    url: 'user/unbinding',
    method: 'get'
  })
}

/** 银行卡解除绑定 */
export function fetchBindBankCard(code) {
  return fetch({
    url: 'user/bindingCard',
    method: 'get',
    params: { cardNo: code }
  })
}

/** 绑定邮箱 */
export function fetchBindEmail(data) {
  return fetch({
    url: 'user/bindEmail',
    method: 'post',
    data
  })
}

/** 检验验证码(修改手机号) */
export function fetchCheckCurrentMobile(code) {
  return fetch({
    url: 'user/checkCurrentMobile',
    method: 'get',
    params: { authCode: code }
  })
}

/** 用户开户 */
export function fetchOpenAccount(data) {
  return fetch({
    url: 'user/openAccount',
    method: 'post',
    data
  })
}

/** 获取设置交易密码请求数据 */
export function fetchSetTransactionPassword(data) {
  return fetch({
    url: 'user/setPwd',
    method: 'get',
    params: data
  })
}

/** 获取重置交易密码请求数据 */
export function fetchResetTransactionPassword(data) {
  return fetch({
    url: 'user/passwordReset',
    method: 'get',
    params: data
  })
}


