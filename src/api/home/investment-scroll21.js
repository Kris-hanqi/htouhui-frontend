import fetch from 'utils/fetch';

/** 获取预约退出信息 */
export function fetchGetReservationExitInfo(id) {
  return fetch({
    url: 'user/getAppointmentExitInfo',
    method: 'get',
    params: {
      joinPlanId: id
    }
  })
}

/** 预约退出 */
export function fetchReservationExit(data) {
  return fetch({
    url: 'user/appointmentExit',
    method: 'post',
    data
  })
}
