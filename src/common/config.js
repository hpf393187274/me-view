export default {
  baseURL: '/api/',
  timeout: 10000,
  logoutSync: true,
  encrypted: true, // storage 是否加密
  ignoring: [
    '/verify/token/sso',
    '/auth/login',
    '/common/config'
  ],
  keys: {
    config: 'config-params',
    tokenSso: 'id_token',
    token: 'authorization',
    redirectUrl: 'redirect_url',
    user: 'user'
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  }
}