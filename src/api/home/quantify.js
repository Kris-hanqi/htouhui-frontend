import fetch from 'utils/fetch';

/** 升薪宝量化 */
export function quantifyList() {
  return fetch({
    url: 'userQuatizationList',
    method: 'get'
  })
}

/** 一键加入接口 */
export function getUserQuantizationInfo(data) {
  return fetch({
    url: 'user/getUserQuantizationInfo',
    method: 'get',
    params: data
  })
}

/** 申请退出 */
export function applyExitInfo(data) {
  return fetch({
    url: 'user/applyExitInfo',
    method: 'get',
    params: data
  })
}

/** 优惠券 */
export function userCouponList(id) {
  return fetch({
    url: 'findUserCouponList/' + id,
    method: 'get'
  })
}

/** 加入记录 */
export function joinRecord(data) {
  return fetch({
    url: 'user/findJoinPlanBill',
    method: 'get',
    params: data
  })
}

/** 退出记录 */
export function outRecord(data) {
  return fetch({
    url: 'user/findExitPlanBill',
    method: 'get',
    params: data
  })
}

/** 平台奖励 */
export function queryPlatformAwardRecord(data) {
  return fetch({
    url: 'queryPlatformAwardRecord',
    method: 'get',
    params: data
  })
}
