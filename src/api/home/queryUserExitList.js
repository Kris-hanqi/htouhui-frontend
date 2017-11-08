import fetch from 'utils/fetch';

/** 退出记录债权信息记录 */
export function queryUserExitList(data) {
  return fetch({
    url: 'user/queryUserExitList',
    method: 'get',
    params: data
  })
}
