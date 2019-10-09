import axios from 'axios'
import Qs from 'qs'

const type_form = 'application/x-www-form-urlencoded; charset=UTF-8'
/**
 * 默认配置
 */
const defaultConfig = {
  'baseURL': '/',
  'timeout': 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
}


/**
 * 默认拦截器：请求
 */
const defaultRequest = {
  resolve(config) {
    const contentType = Reflect.get(config.headers, 'Content-Type')
    if (type_form.includes(contentType)) { config.data = Qs.stringify(config.data) }
    return config
  },
  reject(error) { return Promise.reject(error) }
}
/**
 * 默认拦截器：响应
 */
const defaultResponse = {
  resolve(response) { return response },
  reject(error) { return Promise.reject(error) }
}

const instance = axios

const basal = ({ url, method = "GET", params, data, config }) => {
  return instance({ url, method, params, data, ...config })
}
const http = {
  /**
   * 初始化拦截器
   * @param {Object} param 配置 
   * @param {Object} param.request 请求拦截器
   * @param {Object} param.response 响应拦截器
   */
  initInterceptor({ request, response } = { request: defaultRequest, response: defaultResponse }) {
    instance.interceptors.request.use(request.resolve, request.reject)
    instance.interceptors.response.use(response.resolve, response.reject)
  },
  /**
   * 初始化拦Request截器
   * @param {Object} param 配置 
   * @param {Function} param.resolve 成功的
   * @param {Function} param.failure 失败的
   */
  initInterceptorRequest({ resolve, reject } = defaultRequest) {
    instance.interceptors.request.use(resolve, reject)
  },

  /**
   * 初始化拦Response截器
   * @param {Object} param 配置 
   * @param {Function} param.resolve 成功的
   * @param {Function} param.reject 失败的
   */
  initInterceptorResponse({ resolve, reject } = defaultResponse) {
    instance.interceptors.response.use(resolve, reject)
  },
  /**
   * 初始化配置
   * @param {Object} option 
   */
  initConfig(options) {
    const { headers, ...other } = options
    const newOptions = {
      ...Object.assign(defaultConfig, other),
      headers: { ...Object.assign(defaultConfig.headers, headers) }
    }
    this.updateConfig(newOptions)
  },
  /**
   * 更新配置
   * @param {Object} option 
   */
  updateConfig(options = {}) {
    const { headers, ...other } = options
    // for (const key in headers) {
    //   if (headers.hasOwnProperty(key)) {
    //     const value = headers[key];
    //     if (tools.isEmpty(value)) {
    //       Reflect.deleteProperty(headers, key)
    //     }
    //   }
    // }
    // for (const key in other) {
    //   if (other.hasOwnProperty(key)) {
    //     const value = other[key];
    //     if (tools.isEmpty(value)) {
    //       Reflect.deleteProperty(other, key)
    //     }
    //   }
    // }
    Object.assign(instance.defaults, other)
    Object.assign(instance.defaults.headers, headers)
  },
  setToken(key, value) {
    Reflect.set(instance.defaults.headers, key, value)
  },
  /**
   * 请求：get
   * @param {String} url 
   * @param {Object} params 数据
   * @param {Object} config 配置
   */
  get(url, params = {}, config = {}) {
    return basal({ url, method: 'GET', params, config })
  },
  /**
   * 请求：pust
   * @param {String} url 
   * @param {Object} data 数据
   * @param {Object} config 配置
   */
  post(url, data = {}, config = {}) {
    return basal({ url, method: 'POST', data, config })
  },
  /**
   * 请求：put
   * @param {String} url 
   * @param {Object} data 数据
   * @param {Object} config 配置
   */
  put(url, data = {}, config = {}) {
    return basal({ url, method: 'PUT', data, config })
  },
  /**
   * 请求：delete
 * @param {String} url 
   * @param {Object} params 数据
   * @param {Object} config 配置
   */
  delete(url, params = {}, config = {}) {
    return basal({ url, method: 'DELETE', params, config })
  },
  /**
   * 请求：patch
   * @param {String} url 
   * @param {Object} data 数据
   * @param {Object} config 配置
   */
  patch(url, data = {}, config = {}) {
    return basal({ url, method: 'PATCH', data, config })
  },
  ajax({ url, method, params, data, ...config }) {
    return basal({ url, method, params, data, ...config })
  }
}
http.initInterceptor()
export default http