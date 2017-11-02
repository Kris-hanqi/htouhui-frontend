import fetch from '@/utils/fetch'

/** 发送短信验证码 */
export function fetchSendCode(data) {
  return fetch({
    url: 'user/sendCode',
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

