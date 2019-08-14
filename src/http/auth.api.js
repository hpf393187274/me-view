import { http } from '@assets/script/common'

export default {
  login(params) {
    return http.get('/auth/login', { params })
  },
  heartbeat() {
    return http.get('/auth/heartbeat')
  },
  verifyTokenSso(params) {
    return http.get('/verify/token/sso', params)
  }
} 