import { http } from '@assets/script/common'

export default {
  listBySystem() {
    return http.get('/role/list/system')
  },
  listBySystemAndUser() {
    return http.get('/role/list/system_and_user')
  },
  listByUser() {
    return http.get('/role/list/user')
  }
} 