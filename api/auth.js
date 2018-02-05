import fetch from '../utils/fetch'

/** 用户登录 */
export function fetchLoginByMobile(data) {
  return fetch({
    url: 'loginByMobile',
    method: 'post',
    data
  })
}

/** 获取用户信息 */
export function getUserInfo() {
  return fetch({
    url: 'user/userInfo',
    method: 'get',
    params: {
      isGetRole: true,
      isGetMenuAuth: true
    }
  })
}
