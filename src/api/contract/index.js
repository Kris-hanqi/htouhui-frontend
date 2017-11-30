import fetch from 'utils/fetch';

/** 获取合同内容 */
export function fetchContractContent(id) {
  return fetch({
    url: 'user/queryContractContent',
    method: 'get',
    params: {
      loanId: id
    }
  })
}

/** 合同下载 */
export function fetchContractDownload(id) {
  return fetch({
    url: 'user/downloadOwnerLoanContract',
    method: 'get',
    responseType: 'blob',
    headers: {
      Accept: 'application/pdf'
    },
    params: {
      loanId: id
    }
  })
}


