import fetch from 'utils/fetch';

/** 升薪宝量化21天滚动退出记录债权信息*/
export function getRollPlanExitInfo(data) {
  return fetch({
    url: 'user/getRollPlanExitInfo',
    method: 'get',
    params: data
  })
}
