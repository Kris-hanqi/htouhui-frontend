import Cookies from 'js-cookie';

const tokenKey = 'hth_token';

export function getToken(data) {
  const d = data || tokenKey;
  return Cookies.get(d);
}

export function setToken(data, token) {
  const d = data || tokenKey;
  return Cookies.set(d, token);
}

export function removeToken(data) {
  const d = data || tokenKey;
  return Cookies.remove(d);
}

