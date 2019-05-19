import axios from 'axios'
/**
 * 默认配置
 */
const defaultConfig = {
  'baseURL': '/',
  'timeout': 10000,
  'token': 'AUTH_TOKEN',
  'contentType': 'application/x-www-form-urlencoded'
}

/**
 * 默认拦截器：请求
 */
const defaultRequest = {
  then(config) {
    return config
  },
  catch(error) {
    return Promise.reject(error)
  }
}
/**
 * 默认拦截器：相应
 */
const defaultResponse = {
  then(response) {
    // 对响应数据做点什么
    return response.data.data
  },
  catch(error) {
    return Promise.reject(error)
  }
}

const basal = (url, method, { params = {}, data = {}, ...options } = {}) => {
  return axios({
    url, method, params, data, ...options
  })
}
export default {
  /**
   * 初始化拦截器
   * @param {Object} param 配置 
   * @param {Object} param.request 请求拦截器
   * @param {Object} param.response 相应拦截器
   */
  initIinterceptor({ request = defaultRequest, response = defaultResponse } = {}) {
    axios.interceptors.request.use(request.then, request.catch)
    axios.interceptors.response.use(response.then, response.catch)
  },
  /**
   * 初始化拦Request截器
   * @param {Object} param 配置 
   * @param {Function} param.success 成功的
   * @param {Function} param.failure 失败的
   */
  initIinterceptorRequest({ success = defaultRequest.then, failure = defaultRequest.catch } = {}) {
    axios.interceptors.request.use(success, failure)
  },

  /**
   * 初始化拦Response截器
   * @param {Object} param 配置 
   * @param {Function} param.success 成功的
   * @param {Function} param.failure 失败的
   */
  initIinterceptorResponse({ success = defaultResponse.then, failure = defaultResponse.catch } = {}) {
    axios.interceptors.response.use(success, failure)
  },
  /**
   * 初始化配置
   * @param {Object} option 
   */
  initConfig({ baseURL, timeout, token, contentType } = defaultConfig) {
    this.updateConfig({ baseURL, timeout, token, contentType })
  },
  /**
   * 更新配置
   * @param {Object} option 
   */
  updateConfig({ baseURL, timeout, token, contentType } = {}) {
    timeout && (axios.defaults.timeout = timeout)
    baseURL && (axios.defaults.baseURL = baseURL)
    token && (axios.defaults.headers.common['token'] = token)
    contentType && (axios.defaults.headers.common['Content-Type'] = contentType)
  },
  /**
   * 请求：get
   * @param {String} url 
   * @param {Object} option 
   */
  get(url, option) {
    return basal(url, 'GET', option)
  },
  /**
   * 请求：pust
   * @param {String} url 
   * @param {Object} option 
   */
  pust(url, option) {
    return basal(url, 'PUST', option)
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
}
