import fetch from '@/utils/fetch';

/** 定期项目 */
export function getUserQuantizationInfo(data) {
  return fetch({
    url: 'user/getUserQuantizationInfo',
    method: 'get',
    params: data
  })
}
