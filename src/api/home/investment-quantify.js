import fetch from 'utils/fetch';

/** 获取升薪宝量化列表 */
export function fetchGetList() {
  return fetch({
    url: 'userQuatizationList',
    method: 'get'
  })
}


/** 获取一键加入信息接口 */
export function fetchGetOneKeyJoinInfo(data) {
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

/** 获取可使用优惠券 */
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
