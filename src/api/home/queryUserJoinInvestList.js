import fetch from '@/utils/fetch';

/** 加入记录债权详情页债权信息接口 */
export function queryUserInvestList(data) {
  return fetch({
    url: 'user/queryUserJoinInvestList',
    method: 'get',
    params: data
  })
}
