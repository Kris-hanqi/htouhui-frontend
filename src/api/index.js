import fetch from '../utils/fetch';


/** 首页广告轮播 */
export function banners() {
  return fetch()({
    url: 'bannerList/index',
    method: 'get'
  });
}

/** 首页公告 */
export function notice() {
  return fetch()({
    url: 'notice/1/1',
    method: 'get'
  });
}

/** 首页媒体报道 */
export function media_report() {
  return fetch()({
    url: 'indexNews/5',
    method: 'get'
  });
}

/** 首页投资人风采 */
export function investors() {
  return fetch()({
    url: 'investorSaid',
    method: 'get'
  })
}
