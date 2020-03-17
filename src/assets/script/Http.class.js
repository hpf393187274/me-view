import axios from 'axios'
import Qs from 'qs'
import tools from './Tools.class'
import { type } from './common'

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

const APP_FROM = 'application/x-www-form-urlencoded'
const APP_JSON = 'application/json'
const defaultConfig = {
  headers: {
    'Content-Type': APP_FROM,
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer (params) {
    return Qs.stringify(params, { arrayFormat: 'repeat' })
  },
  transformRequest: [
    (data, config) => {
      const contentType = Reflect.get(config, 'Content-Type')
      console.debug(`axios.transformRequest -> config['Content-Type'] = ${contentType}`)
      if (contentType.includes(APP_JSON)) {
        console.debug(`${APP_JSON} --------`, JSON.stringify(data))
        return JSON.stringify(data)
      }

      if (contentType.includes(APP_FROM)) {
        console.debug(`${APP_FROM} -----------`, Qs.stringify(data, { arrayFormat: 'repeat' }))
        return Qs.stringify(data, { arrayFormat: 'repeat' })
      }
      return data
    }
  ]
}

export default class Http {
  static APP_FROM = APP_FROM

  static APP_JSON = APP_JSON

  constructor ({ baseURL, timeout = 2000, headers = {} } = { }) {
    Object.assign(defaultConfig, { baseURL, timeout })
    if (type.notObject(defaultConfig.headers)) {
      defaultConfig.headers = {}
    }
    Object.assign(defaultConfig.headers, headers)
    console.debug('new Http config：', defaultConfig)
    this.instance = axios.create({ ...defaultConfig })
    this.name = tools.UUId()
    console.debug('new Http -> name = ', this.name)
  }

  initHttp ({ baseURL, timeout = 2000, headers = {} } = { }) {
    if (type.notObject(this.defaults.headers)) {
      this.defaults.headers = {}
    }
    console.debug('Http.initHttp before -> name = ', this.defaults)
    Object.assign(this.defaults, { baseURL, timeout })
    Object.assign(this.defaults.headers, headers)
    console.debug('Http.initHttp after -> name = ', this.defaults)
    console.debug('Http.initHttp -> name = ', this.name)
  }

  get defaults () { return this.instance.defaults }

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
