import fetch from 'utils/fetch';

/** 债权合同 */
export function attornSignedFileUrl(data) {
  return fetch({
    url: 'user/attornSignedFileUrl',
    method: 'get',
    params: data
  })
}
