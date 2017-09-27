import fetch from '../utils/fetch';


/** 首页广告轮播 */
export function banners() {
  return fetch()({
    url: 'bannerList/index',
    method: 'get'
  });
}

/** 首页新手计划 */

/** 首页21天计划 */

/** 首页升薪宝量化 */
export function shengxinbao_lianghua() {
  return fetch()({
    url: 'quantizations/4',
    method: 'get'
  })
}

/** 首页精选定期 */
export function regularIntervals() {
  return fetch()({
    url: 'iloans',
    method: 'post',
    data: {
      size: '4',
      userId: 'h1217350723'
    }
  })
}

/** 首页公告 */
export function notice() {
  return fetch()({
    url: 'notice/1/1',
    method: 'get'
  });
}

/** 首页平台数据播报 */
export function platform() {
  return fetch()({
    url: 'platformData',
    method: 'get'
  })
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
