import fetch from '@/utils/fetch'

/** 获取我的资产 */
export function fetchAsset() {
  return fetch({
    url: 'user/investStatistics',
    method: 'get'
  })
}
