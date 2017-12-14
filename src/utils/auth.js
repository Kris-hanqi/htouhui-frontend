import Cookies from 'js-cookie';
import uuid from 'utils/uuid';

const TokenKey = 'user_token';
const uuidKey = 'hth_uuid';

export function getToken() {
  return Cookies.get(TokenKey);
}

/** 设置失效时间为20分钟 */
export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 / 96 });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUuid() {
  return Cookies.get(uuidKey);
}

export function setUuid() {
  return Cookies.set(uuidKey, uuid(), { expires: 2 });
}
