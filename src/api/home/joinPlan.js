import fetch from 'utils/fetch';

/** 加入记录 */
export function joinPlan(data) {
  return fetch({
    url: 'user/findJoinPlanBill',
    method: 'get',
    params: data
  })
}
