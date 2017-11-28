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

/** 获取退出标的页面信息 */
export function fetchGetExitInfo(data) {
  return fetch({
    url: 'user/applyExitInfo',
    method: 'get',
    params: data
  })
}

/** 退出标的 */
export function fetchExitPlan(data) {
  return fetch({
    url: 'user/exitPlan',
    method: 'post',
    data
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

/** 资产详情-债权信息 */
export function feachJoinPlanDetails(data) {
  return fetch({
    url: 'user/getJoinInfo',
    method: 'get',
    params: data
  })
}

/** 退出记录 */
export function feachExitPlanBill(data) {
  return fetch({
    url: 'user/findExitPlanBill',
    method: 'get',
    params: data
  })
}

/** 退出记录-债权详情页债权信息 */
export function feachGetExitList(data) {
  return fetch({
    url: 'user/queryUserExitList',
    method: 'get',
    params: data
  })
}

