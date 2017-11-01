import fetch from '@/utils/fetch';

/** 获取借款记录 / 无参数返回总数 */
export function fetchPageList(data) {
  return fetch({
    url: 'user/lrstatistic',
    method: 'get',
    params: data
  })
}
