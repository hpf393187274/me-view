import axios from 'axios'
import tools from './tools.common'
import jsonp from './tools.common'
/**
 * 默认配置
 */
const defaultConfig = {
  'baseURL': '/',
  'timeout': 10000,
  'tokenKey': 'authorization',
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-Requested-With': 'XMLHttpRequest'
}

/**
 * 默认配置
 */
const newConfig = Object.assign({}, defaultConfig)

/**
 * 默认拦截器：请求
 */
const defaultRequest = {
  resolve(config) { return config },
  reject(error) { return Promise.reject(error) }
}
/**
 * 默认拦截器：相应
 */
const defaultResponse = {
  resolve(response) { return response.data.data },
  reject(error) { return Promise.reject(error) }
}


const basal = (url, method, { params = {}, data = {}, ...options } = {}) => {
  return axios({ url, method, params, data, ...options })
}
export default {
  getConfig() {
    return { ...newConfig }
  },
  getConfigKey(key) {
    return Reflect.get(newConfig, key)
  },
  /**
   * 初始化拦截器
   * @param {Object} param 配置 
   * @param {Object} param.request 请求拦截器
   * @param {Object} param.response 相应拦截器
   */
  initIinterceptor({ request = defaultRequest, response = defaultResponse } = {}) {
    axios.interceptors.request.use(request.resolve, request.failure)
    axios.interceptors.response.use(response.resolve, response.failure)
  },
  /**
   * 初始化拦Request截器
   * @param {Object} param 配置 
   * @param {Function} param.resolve 成功的
   * @param {Function} param.failure 失败的
   */
  initIinterceptorRequest({ resolve = defaultRequest.resolve, reject = defaultRequest.reject } = {}) {
    axios.interceptors.request.use(resolve, reject)
  },

  /**
   * 初始化拦Response截器
   * @param {Object} param 配置 
   * @param {Function} param.resolve 成功的
   * @param {Function} param.reject 失败的
   */
  initIinterceptorResponse({ resolve = defaultResponse.resolve, reject = defaultResponse.reject } = {}) {
    axios.interceptors.response.use(resolve, reject)
  },
  /**
   * 初始化配置
   * @param {Object} option 
   */
  initConfig(options) {
    this.updateConfig(Object.assign(newConfig, options))
  },
  /**
   * 更新配置
   * @param {Object} option 
   */
  updateConfig(options = {}) {
    const config = Object.assign({}, options)
    tools.isNotEmpty(config.timeout) && (axios.defaults.timeout = config.timeout);
    tools.isNotEmpty(config.baseURL) && (axios.defaults.baseURL = config.baseURL);

    const contentType = Reflect.get(config, 'Content-Type');
    if (tools.isNotEmpty(contentType)) {
      Reflect.set(axios.defaults.headers, 'Content-Type', contentType)
    }

    const requested = Reflect.get(config, 'X-Requested-With');
    if (tools.isNotEmpty(requested)) {
      Reflect.set(axios.defaults.headers, 'X-Requested-With', requested)
    }
  },
  setTokenValue(value) {
    this.setToken(newConfig.tokenKey, value)
  },
  setToken(key, value) {
    Reflect.set(axios.defaults.headers, key, value)
  },
  /**
   * 请求：get
   * @param {String} url 
   * @param {Object} option 
   */
  get(url, option = {}) {
    return basal(url, 'GET', option)
  },
  /**
   * 请求：pust
   * @param {String} url 
   * @param {Object} option 
   */
  post(url, option) {
    return basal(url, 'POST', option)
  },
  /**
   * 请求：put
   * @param {String} url 
   * @param {Object} option 
   */
  put(url, option) {
    return basal(url, 'PUT', option)
  },
  /**
   * 请求：delete
   * @param {String} url 
   * @param {Object} option 
   */
  delete(url, option) {
    return basal(url, 'DELETE', option)
  },
  /**
   * 请求：patch
   * @param {String} url 
   * @param {Object} option 
   */
  patch(url, option) {
    return basal(url, 'PATCH', option)
  },
  /**
   * 请求：head
   * @param {String} url 
   * @param {Object} option 
   */
  head(url, option) {
    return basal(url, 'HEAD', option)
  },
  jsonp(url) {
    return jsonp(url)
  }
}
