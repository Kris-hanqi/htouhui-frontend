import fetch from 'utils/fetch';

/** 退出记录债权信息 */
export function findExitPlanBill(data) {
  return fetch({
    url: 'user/findExitPlanBill',
    method: 'get',
    params: data
  })
}
