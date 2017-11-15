import fetch from 'utils/fetch';

/** 获取新手计划标的 */
export function fetchNovicePlanInfo() {
  return fetch({
    url: 'user/getNovicePlanInfo',
    method: 'get'
  })
}

/** 加入记录 */
export function fetchJoinPlanBill(data) {
  return fetch({
    url: 'user/findJoinPlanBill',
    method: 'get',
    params: data
  })
}

