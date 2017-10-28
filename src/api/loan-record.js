import fetch from '@/utils/fetch';

/** 借款记录 */
export function fetchPageList(data) {
  return fetch({
    url: 'lrstatistic',
    method: 'get',
    params: data
  })
}
