import http from '../config-http'

export default {
  findPage (params) {
    return http.get('authority/menu/paged', params)
  }
}
