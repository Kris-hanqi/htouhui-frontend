import fetch from 'utils/fetch'

/** 获取银行限额列表 */
export function fetchBankLimit() {
  return fetch({
    url: 'user/bankQuota',
    method: 'get'
  })
}

/** 获取广告推荐 */
export function fetchAdRecommend() {
  return fetch({
    url: 'user/adRecommend',
    method: 'get'
  })
}

/** 刷新token */
export function fetchUpdateServeToken() {
  return fetch({
    url: 'userRefreshTokenServlet',
    method: 'get'
  })
}

/** 更新用户状态 */
export function fetchUpdateUserStatus() {
  return fetch({
    url: 'refreshAuthority',
    method: 'get'
  })
}


