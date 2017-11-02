import fetch from '@/utils/fetch';

/** 升薪宝量化 */
export function quantifyList() {
  return fetch({
    url: 'userQuatizationList',
    method: 'get'
  })
}
