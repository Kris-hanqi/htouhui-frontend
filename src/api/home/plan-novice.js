import fetch from '@/utils/fetch';

/** 获取新手计划标的 */
export function planNovice(data) {
  return fetch({
    url: 'user/findJoinPlanBill',
    method: 'get',
    params: data
  })
}
