import fetch from '@/utils/fetch';

/** 获取借款记录 */
export function fetchLoanRecordPageList(data) {
  return fetch({
    url: 'user/loanrepayment',
    method: 'get',
    params: data
  })
}

/** 获取借款记录统计结果 */
export function fetchLoanRecordStatistic(data) {
  return fetch({
    url: 'user/lrstatistic',
    method: 'get',
    params: data
  })
}

/** 获取近期还款记录 */
export function fetchRecentlyRepaymentPageList(data) {
  return fetch({
    url: 'user/curMonthRepayments',
    method: 'get',
    params: data
  })
}

/** 获取近期还款统计结果 */
export function fetchRecentlyRepaymentStatistic(data) {
  return fetch({
    url: 'user/currentmonthstatistic',
    method: 'get',
    params: data
  })
}
