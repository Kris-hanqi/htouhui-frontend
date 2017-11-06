import Cookies from 'js-cookie';
import uuid from 'utils/uuid';

const TokenKey = 'token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

const uuidKey = 'hth-uuid';

export function getUuid() {
  return Cookies.get(uuidKey);
}

export function setUuid() {
  return Cookies.set(uuidKey, uuid(), { expires: 2 });
}
