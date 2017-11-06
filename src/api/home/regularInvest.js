import fetch from '@/utils/fetch';

/** 定期项目 */
export function regularInvest(data) {
  return fetch({
    url: 'user/regularInvest',
    method: 'get',
    params: data
  })
}

/** 定期项目还款计划 */
export function investRepays(data) {
  return fetch({
    url: 'user/investRepays',
    method: 'get',
    params: data
  })
}

/** 定期项目额外收益 */
export function extendEarn(data) {
  return fetch({
    url: 'user/extendEarn',
    method: 'get',
    params: data
  })
}
