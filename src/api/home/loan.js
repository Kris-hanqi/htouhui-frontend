import fetch from 'utils/fetch';

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
export function fetchRecentlyRepaymentStatistic() {
  return fetch({
    url: 'user/currentmonthstatistic',
    method: 'get'
  })
}

/** 获取还款计划 */
export function feachgRepaymentPlan(data) {
  return fetch({
    url: 'user/loanAdvanceRepayinfo',
    method: 'get',
    params: data
  })
}

/** 还款 */
export function fetchRepayment(data) {
  return fetch({
    url: 'jixin/commonRepay',
    method: 'get',
    params: data
  })
}

/** 提前还款 */
export function fetchAdvanceRepayment(id) {
  return fetch({
    url: 'jixin/advanceRepay',
    method: 'get',
    params: {
      loanId: id
    }
  })
}

/** 合同下载 */
export function fetchContractDownload(id) {
  return fetch({
    url: 'user/borrowerEnsignFileDownload',
    method: 'get',
    params: {
      loanId: id
    }
  })
}
