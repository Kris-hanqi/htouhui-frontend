import fetch from '@/utils/fetch';

/** 获取个人中心广告 */
export function fetchARecommend() {
  return fetch({
    url: 'user/adRecommend',
    method: 'get'
  })
}
