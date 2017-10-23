import fetch from '@/utils/fetch'

/** 用户登录 */
export function fetchLogin(data) {
  return fetch({
    url: '/loginByPassword',
    method: 'post',
    data
  })
}

/** 获取用户信息 */
export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

