import { http, type, tools } from '@assets/script/common'
import config from '@common/config'
import util from '@common/util'
import { Message } from 'element-ui';
http.initConfig({
  baseURL: config.baseURL,
  tokenKey: config.keys.token,
  'Content-Type': config.headers['Content-Type'] || 'application/x-www-form-urlencoded',
  'X-Requested-With': config.headers['X-Requested-With'] || 'XMLHttpRequest'
})

const systemConfig = util.get(config.keys.config)
console.log('systemConfig', '-->', systemConfig)
http.initIinterceptorRequest({
  resolve(options) {
    const requestUrl = options.baseURL + options.url
    for (const path of config.ignoring) {
      if (requestUrl.includes(path)) {
        return options
      }
    }
    const token = util.get(config.keys.token)
    if (tools.isEmpty(token)) {
      return util.sendRedirect(systemConfig.urlLogout, config.logoutSync)
    }
    Object.assign(options.headers, { [config.keys.token]: token })
    return options
  }
})


http.initIinterceptorResponse({
  resolve(response) {
    const token = response.headers.authorization
    if (tools.isNotEmpty(token)) {
      util.set(config.keys.token, token)
    }
    if (type.isString(response.data)) {
      const regExp = /<[^<>]*>|<\/[^<>]*>/gm
      eval(response.data.replace(regExp, ''))
      return Promise.reject("登陆失效，请重新登录")
    }
    if (tools.isNotEmpty(response.data.code)) {
      const code = response.data.code
      if (code.startsWith('SUCCESS_')) {
        return response.data.data
      }

      if (code.startsWith('TOKEN_')) {
        return util.sendRedirect(systemConfig.urlLogout, config.logoutSync)
      }
      if (code === 'LOGOUT_AUTHORITY') {
        return util.sendRedirect(systemConfig.urlLogin)
      }

      if (code === 'LOGINED_AUTHORITY') {
        Message.warning({
          showClose: true,
          message: '该资源无权访问。',
        })
      }
    }
    return Promise.reject(response.data)
  }
})