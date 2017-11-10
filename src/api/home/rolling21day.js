import fetch from 'utils/fetch';

/** 升薪宝量化21天退出*/
export function getAppointmentExitBill(data) {
  return fetch({
    url: 'user/getAppointmentExitBill',
    method: 'get',
    params: data
  })
}

/** 升薪宝21天滚动退出记录债权信息*/
export function getRollPlanExitInfo(data) {
  return fetch({
    url: 'user/getRollPlanExitInfo',
    method: 'get',
    params: data
  })
}

/** 升薪宝滚动21退出记录债权详情页债权信息*/
export function queryAppointmentExitInvest(data) {
  return fetch({
    url: 'user/queryAppointmentExitInvest',
    method: 'get',
    params: data
  })
}

/** 升薪宝量化21天预约退出页面*/
export function getAppointmentExitInfo(data) {
  return fetch({
    url: 'user/getAppointmentExitInfo',
    method: 'get',
    params: data
  })
}

