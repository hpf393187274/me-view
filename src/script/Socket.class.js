
import Assert from './Assert.class'
import type from './Type.class'
import EventMonitor from './EventMonitor.class'
export default class Socket extends EventMonitor {
  #socket
  constructor (host = 'localhost', port = 80) {
    super()
    Assert.notEmpty(host, '请输入 host 地址')
    this.#socket = new WebSocket(`ws://${host}:${port}`)

    this.#socket.addEventListener('message', event => { this.#message(event.data) })

    this.#socket.addEventListener('close', event => { this.#close(event) })

    this.#socket.addEventListener('error', event => { this.#error(event) })
  }

  #message = data => {
    if (type.isString(data)) {
      try {
        data = JSON.parse(data)
      } catch (error) {
        console.debug('JSON.parse 数据异常：', error)
      }
    }

    this.dispatchEvent('message', data)

    if (type.isObject(data)) {
      const { topic } = data || {}
      if (topic) {
        this.dispatchEvent(`message-${topic}`, data)
      }
    }
  }

  #error = event => { }

  #close = event => { }
}
