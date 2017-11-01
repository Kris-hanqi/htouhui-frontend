import fetch from '@/utils/fetch';

/** 获取21天投资记录 */
export function plan21dayJoin(data) {
  return fetch({
    url: 'user/findJoinPlanBill',
    method: 'get',
    params: data
  })
}
