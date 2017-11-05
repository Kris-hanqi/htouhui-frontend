import fetch from '@/utils/fetch';

/** 获取站内消息列表 */
export function fetchPageList(data) {
  return fetch({
    url: 'user/queryInboxs',
    method: 'get',
    params: data
  })
}

/** 获取站内消息详情 */
export function fetchDetail(data) {
  return fetch({
    url: 'user/queryInboxDetail',
    method: 'get',
    params: data
  })
}
