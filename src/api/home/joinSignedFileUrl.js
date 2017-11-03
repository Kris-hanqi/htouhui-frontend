import fetch from '@/utils/fetch';

/** 加入合同 */
export function joinSignedFileUrl(data) {
  return fetch({
    url: 'user/joinSignedFileUrl',
    method: 'get',
    params: data
  })
}
