import fetch from '@/utils/fetch';

/** 退出记录债权信息*/
export function getExitInfo(data) {
  return fetch({
    url: 'user/getExitInfo',
    method: 'get',
    params: data
  })
}
