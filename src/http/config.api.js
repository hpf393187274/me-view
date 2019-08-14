import { http, type } from '@assets/script/common'
import config from '@common/config'
import util from '@common/util'
export default {
  loadConfig() {
    const systemConfig = util.set(config.keys.config)
    if (type.isObject(systemConfig)) {
      return Promise.resolve(systemConfig);
    }
    return new Promise((resolve, reject) => {
      http.get('/common/config')
        .then(data => {
          util.set(config.keys.config, data)
          resolve(data)
        })
        .catch(error => { reject(error) })
    })
  }
} 