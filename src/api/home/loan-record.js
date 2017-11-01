import fetch from '@/utils/fetch';

/** 获取借款记录 */
export function fetchPageList(data) {
  return fetch({
    url: 'user/loanrepayment',
    method: 'get',
    params: data
  })
}

/** 获取借款记录统计结果 */
export function fetchStatistic(data) {
  return fetch({
    url: 'user/lrstatistic',
    method: 'get',
    params: data
  })
}
