import fetch from 'utils/fetch'

/** 发送短信验证码 */
export function fetchSendCode(data) {
  return fetch({
    url: 'user/sendCode',
    method: 'get',
    params: data
  })
}

/** 发送短信验证码 NEW */
export function fetchSendCodeNew(data) {
  return fetch({
    url: 'user/sendAuthCode',
    method: 'get',
    params: data
  })
}

/** 发送邮箱验证码 */
export function fetchSendEmailCode(data) {
  return fetch({
    url: 'user/sendEmailCode',
    method: 'post',
    data
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

