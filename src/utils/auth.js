import Cookies from 'js-cookie';

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

export function setUuid(token) {
  return Cookies.set(uuidKey, token, { expires: 2 });
}
