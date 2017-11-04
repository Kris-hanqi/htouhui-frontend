import fetch from '@/utils/fetch';

/** 资产详情-债权信息 */
export function joinPlan(data) {
  return fetch({
    url: 'user/getJoinInfo',
    method: 'get',
    params: data
  })
}
