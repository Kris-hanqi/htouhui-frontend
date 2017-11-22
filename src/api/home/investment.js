import fetch from 'utils/fetch';

/** 加入标的 */
export function fetchJoinPlan(data) {
  return fetch({
    url: 'user/joinPlan',
    method: 'post',
    data
  })
}

/** 获取加入记录 */
export function fetchJoinPlanBill(data) {
  return fetch({
    url: 'user/findJoinPlanBill',
    method: 'get',
    params: data
  })
}

/** 资产详情页债权信息 */
export function feachAssetInfoClaims(data) {
  return fetch({
    url: 'user/queryUserAssetInfoList',
    method: 'get',
    params: data
  })
}

/** 加入记录债权信息 */
export function feachJoinInvestClaims(data) {
  return fetch({
    url: 'user/queryUserJoinInvestList',
    method: 'get',
    params: data
  })
}

/** 获取新手计划标的信息 */
export function fetchNovicePlanInfo() {
  return fetch({
    url: 'user/getNovicePlanInfo',
    method: 'get'
  })
}
