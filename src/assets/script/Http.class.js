import axios from 'axios'
import Qs from 'qs'

const defaultAction = {
  request: {
    resolve (config) { return config },
    reject (error) { return Promise.reject(error) }
  },
  response: {
    resolve (response) { return response },
    reject (error) { return Promise.reject(error) }
  }
}

const CONFIG = {
  defaultHeaders: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer (params) {
    return Qs.stringify(params, { arrayFormat: 'repeat' })
  },
  transformRequest: [
    (data, config) => {
      const contentType = Reflect.get(config, 'Content-Type')
      if (contentType.includes('application/json')) {
        console.debug('application/json -----------', JSON.stringify(data))
        return JSON.stringify(data)
      }

      if (contentType.includes('application/x-www-form-urlencoded')) {
        console.debug('application/x-www-form-urlencoded-----------', Qs.stringify(data, { arrayFormat: 'repeat' }))
        return Qs.stringify(data, { arrayFormat: 'repeat' })
      }
      return data
    }
  ]
}

export default class Http {
  constructor ({ baseURL, timeout, headers }) {
    this.initHttp({ baseURL, timeout, headers })
  }

  initHttp ({ baseURL, timeout, headers } = { timeout: 1000, baseURL: '/' }) {
    const { defaultHeaders, ...other } = CONFIG
    const __headers = Object.assign({}, defaultHeaders, headers || {})
    this.instance = axios.create({ baseURL, timeout, headers: __headers, ...other })
  }

  get interceptors () {
    return this.instance.interceptors
  }

  /**
   * 初始化拦截器
   * @param {Object} param 配置
   * @param {Object} param.request 请求拦截器
   * @param {Object} param.response 响应拦截器
   */
  initInterceptor (params = { }) {
    const { request, response } = Object.assign({}, defaultAction, params)
    this.interceptors.request.use(request.resolve, request.reject)
    this.interceptors.response.use(response.resolve, response.reject)
  }

  /**
   * 初始化拦Request截器
   * @param {Object} param 配置
   * @param {Function} param.resolve 成功的
   * @param {Function} param.failure 失败的
   */
  initInterceptorRequest (param = {}) {
    const { resolve, reject } = Object.assign({}, defaultAction.request, param)
    this.interceptors.request.use(resolve, reject)
  }

  /**
   * 初始化拦Response截器
   * @param {Object} param 配置
   * @param {Function} param.resolve 成功的
   * @param {Function} param.reject 失败的
   */
  initInterceptorResponse (param = {}) {
    const { resolve, reject } = Object.assign({}, defaultAction.response, param)
    this.interceptors.response.use(resolve, reject)
  }

  /**
   * 请求：get
   * @param {String} url
   * @param {Object} params 数据
   * @param {Object} config 配置
   */
  get (url, params = {}, config = {}) {
    return this.ajax({ url, method: 'GET', params, config })
  }

  /**
   * 请求：pust
   * @param {String} url
   * @param {Object} data 数据
   * @param {Object} config 配置
   */
  post (url, data = {}, config = {}) {
    return this.ajax({ url, method: 'POST', data, config })
  }

  /**
   * 请求：put
   * @param {String} url
   * @param {Object} data 数据
   * @param {Object} config 配置
   */
  put (url, data = {}, config = {}) {
    return this.ajax({ url, method: 'PUT', data, config })
  }

  /**
   * 请求：delete
 * @param {String} url
   * @param {Object} params 数据
   * @param {Object} config 配置
   */
  delete (url, params = {}, config = {}) {
    return this.ajax({ url, method: 'DELETE', params, config })
  }

  /**
   * 请求：patch
   * @param {String} url
   * @param {Object} data 数据
   * @param {Object} config 配置
   */
  patch (url, data = {}, config = {}) {
    return this.ajax({ url, method: 'PATCH', data, config })
  }

  ajax ({ url, method = 'GET', params, data, config }) {
    return this.instance({ ...config, url, method, params, data })
  }
}
