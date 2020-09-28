import axios from 'axios'
import Tools from 'me-view/src/script/tools'
import Type from 'me-view/src/script/type'

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
    return Tools.stringify(params, { arrayFormat: 'repeat' })
  },
  transformRequest: [
    (data, headers) => {
      console.debug('http.transformRequest ----------------------------------- ')
      if (Tools.isEmpty(data) || Reflect.has(headers || {}, 'Content-Type') === false) { return data }

      const contentType = Reflect.get(headers || {}, 'Content-Type')
      console.debug(`axios.transformRequest -> headers['Content-Type'] = ${contentType}`)

      if (Type.isObject(data) && contentType.includes(APP_FROM)) {
        console.debug(`${APP_FROM} -----------`, Tools.stringify(data, { arrayFormat: 'repeat' }))
        return Tools.stringify(data, { arrayFormat: 'repeat' })
      }

      if (Type.isObjectOrArray(data) && contentType.includes(APP_JSON)) {
        console.debug(`${APP_JSON} --------`, JSON.stringify(data))
        return JSON.stringify(data)
      }
      return data
    }
  ]
}

export default class Http {
  static APP_FROM = APP_FROM
  static APP_JSON = APP_JSON

  #instance
  #name
  #method

  constructor ({ baseURL, timeout = 2000, headers = {} } = { }) {
    const defaults = { ...defaultConfig, headers: { ...defaultConfig.headers } }
    Object.assign(defaults, { baseURL, timeout })

    Object.assign(defaults.headers, headers)

    console.debug('Http.constructor --> defaults', defaults)
    this.#instance = axios.create({ ...defaults })
    this.#name = Tools.UUId()
    console.debug('Http.constructor --> name：', this.#name)
  }

  set method (value = 'GET') {
    this.#method = value
  }

  get method () {
    return this.#method
  }

  initHttp ({ baseURL, timeout = 2000, headers = {} } = { }) {
    if (Type.notObject(this.defaults.headers)) {
      this.defaults.headers = {}
    }

    console.debug('Http.initHttp --> before defaults：', this.defaults)
    Object.assign(this.defaults, { baseURL, timeout })

    Object.assign(this.defaults.headers, headers)
    console.debug('Http.initHttp --> after defaults：', this.defaults)
    console.debug('Http.initHttp --> name：', this.#name)
  }

  get defaults () { return this.#instance.defaults }

  get interceptors () {
    return this.#instance.interceptors
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
    return this.#instance({ url, method, params, data, ...config })
  }
}
