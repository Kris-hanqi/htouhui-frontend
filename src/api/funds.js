import fetch from '@/utils/fetch';

/** 获取资金流水 */
export function fetchPageList(data) {
  return fetch({
    url: 'user/newUserBill',
    method: 'post',
    data
  })
}
