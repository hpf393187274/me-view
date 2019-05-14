import axios from 'axios'
let AUTH_TOKEN = ''
axios.defaults.timeout = '10000'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response.data.data
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default {
  get(url, option) {
    return axios.get(url, option)
  },
  pust(url, option) {
    return axios.pust(url, option)
  },
  put(url, option) {
    return axios.put(url, option)
  },
  delete(url, option) {
    return axios.delete(url, option)
  }
}
