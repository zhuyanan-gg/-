import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
const timeKey = 'hrsaas-ihrm-token_time'

export function getTime() {
  return Cookies.get(timeKey)
}
export function setTime() {
  Cookies.set(timeKey, +new Date())
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
