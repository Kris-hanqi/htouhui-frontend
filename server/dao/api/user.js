import fetch from '../../utils/request'

/** 用户登录 */
export function loginByPassword(data) {
  return fetch({
    url: 'loginByPassword',
    rejectUnauthorized: false,
    method: 'post',
    data
  })
}
