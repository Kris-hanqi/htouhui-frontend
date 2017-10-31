import fetch from '@/utils/fetch'

/** 获取优惠券列表 */
export function fetchStatisticData() {
  return fetch({
    url: 'currentmonthstatistic',
    method: 'get'
  })
}
