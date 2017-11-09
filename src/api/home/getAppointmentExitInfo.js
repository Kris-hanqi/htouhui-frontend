import fetch from 'utils/fetch';

/** 升薪宝量化21天预约退出页面*/
export function getAppointmentExitInfo(data) {
  return fetch({
    url: 'user/getAppointmentExitInfo',
    method: 'get',
    params: data
  })
}
