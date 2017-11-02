import fetch from '@/utils/fetch';

/** 获取新手计划标的 */
export function planNovice() {
  return fetch({
    url: 'user/getNovicePlanInfo',
    method: 'get'
  })
}

