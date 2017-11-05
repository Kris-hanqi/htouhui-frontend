import fetch from '@/utils/fetch'

/** 获取优惠券列表 */
export function fetchPageList(data) {
  return fetch({
    url: 'user/queryUserCouponRecord',
    method: 'get',
    params: data
  })
}

/** 兑换优惠券 */
export function fetchExchangeCoupon(data) {
  return fetch({
    url: 'user/activeCoupon',
    method: 'get',
    params: data
  })
}
