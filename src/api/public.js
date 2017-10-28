import fetch from '@/utils/fetch'

/** 发送短信验证码 */
export function fetchSendCode(data) {
  return fetch({
    url: 'sendCode',
    method: 'get',
    params: data
  })
}
