import fetch from 'utils/fetch';

/** 定期项目 */
export function fetchGetPageList(data) {
  return fetch({
    url: 'user/regularInvest',
    method: 'get',
    params: data
  })
}

/** 定期项目还款计划 */
export function fetchInvestRepays(data) {
  return fetch({
    url: 'user/investRepays',
    method: 'get',
    params: data
  })
}

/** 定期项目额外收益 */
export function feachExtendEarn(data) {
  return fetch({
    url: 'user/extendEarn',
    method: 'get',
    params: data
  })
}
