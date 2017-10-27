import fetch from '@/utils/fetch';

/** 获取个人中心广告 */
export function fetchPageList(query) {
  return fetch({
    url: 'user/newUserBill',
    method: 'get',
    params: query
  })
}
