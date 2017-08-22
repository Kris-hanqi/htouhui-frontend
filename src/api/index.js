import fetch from '../utils/fetch';

export function banners() {
  return fetch()({
    url: 'bannerList/index',
    method: 'get'
  });
}
