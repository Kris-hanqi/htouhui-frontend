import fetch from 'utils/fetch';

/** 资产详情页债权信息接口 */
export function queryUserAssetInfoList(data) {
  return fetch({
    url: 'user/queryUserAssetInfoList',
    method: 'get',
    params: data
  })
}
