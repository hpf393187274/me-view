import { Http, Type, Tools, session, Message } from '../../../src/index'

const http = new Http({
  baseURL: '/api/',
  timeout: 5 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})
const json = {
  'Content-Type': 'application/json'
}

const form = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

export { json, form }

export default http
http.initInterceptorRequest({
  resolve (options) {
    if (Tools.isEmpty(options.headers)) {
      Reflect.set(options, 'headers', {})
    }
    Object.assign(options.headers, {
      authorization: 'Bearer-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJjb2RlXCI6XCIwMTY4NTI0NlwiLFwiaWRcIjoxLFwibmFtZVwiOlwi5L6v5paM6aOeXCIsXCJwaG9uZVwiOlwiMTU4Mjk2Njk5MDVcIixcInN0YXR1c1wiOlwiVkFMSURcIn0iLCJqdGkiOiIwMmU5Y2I5MS03ODExLTRlODItOWQ5MS1lNzc2Y2VjYTU2ZjciLCJpYXQiOjE1OTM0MDc3MzIsImV4cCI6MTU5MzQxNDkzMn0.BPFekQN4S4XA7xYAWjCP0iaNIje56AyC6QnvVWIjVTxDCD8j9Mf7fQDWuOLLGVnFbbSDvsMSQoMJ2Zege7W0Ug' || session.get('authorization')
    })
    return options
  }
})
http.initInterceptorResponse({
  resolve (response) {
    console.debug('http --> response：', response)
    const { data, headers } = response
    const authorization = Reflect.get(headers || {}, 'authorization')
    if (Tools.notEmpty(authorization)) {
      session.set('authorization', authorization)
    }

    if (Type.isBlog(data)) {
      // 支持二进制下载
      console.debug('http --> data is blog：', data)
      return { data, headers }
    }

    if (Type.isString(data)) {
      console.debug('http --> data is string：', data)
      return data
    }

    if (Type.isObject(data)) {
      console.debug('http --> data is object：', data)
      if (data.success === true) {
        return data.data
      }
      if (Tools.notEmpty(data.code)) {
        const code = data.code
        if (code.startsWith('TOKEN_')) {
          Message.error('即将进入登录页面')
          setTimeout(() => {
            top.location.href = '/login'
          }, 1000 * 3)
          return
        }

        if (code === 'ERROR_UNKNOWN') {
          console.error('未知异常', '->', data.message)
        }
      }
    }

    console.debug('http --> data error：', data)
    return Promise.reject(new Error({ data, headers, response }))
  },
  reject ({ response, message }) {
    console.debug('http.reject --> response：', response)
    let { status } = response
    console.warn('请求异常：status：，message：')
    if (status === 404) {
      Message.error('请求的接口不存在')
      message = status = undefined
    }

    if (status === 500) {
      Message.error('服务端异常')
      message = status = undefined
    }

    return Promise.reject(new Error({ message, status }))
  }
})
