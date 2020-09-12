
import Assert from './assert'
import Type from './type'
import EventMonitor from './event-monitor'
import Tools from './tools'
export default class Socket extends EventMonitor {
  #socket
  constructor ({ host = 'localhost', port = 80, path = '' } = {}) {
    super()
    Assert.notEmpty(host, '请输入 host 地址')
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocket
    }

    this.#socket = new WebSocket(`ws://${host}:${port}${path}`)

    console.debug('readyState', this.#socket.readyState)

    this.#socket.addEventListener('open', event => { console.debug('websocket open') })

    this.#socket.addEventListener('message', event => { this.#message(event.data) })

    this.#socket.addEventListener('close', event => { this.#close(event) })

    this.#socket.addEventListener('error', event => { this.#error(event) })
  }

  get readyState () {
    return this.#socket.readyState
  }

  publish ({ topic, data } = {}) {
    if (Tools.isBlank(topic)) {
      console.warn('websocket -> topic is null')
    }
    if (this.#socket.readyState === WebSocket.OPEN) {
      this.#socket.send(JSON.stringify({ topic, data }))
    } else {
      console.warn('WebSocket 连接没有建立成功！')
    }
  }

  #open = data => {
    console.debug('websocket open')
  }

  #message = data => {
    if (Type.isString(data)) {
      try {
        data = JSON.parse(data)
      } catch (error) {
        console.debug('JSON.parse 数据异常：', error)
      }
    }

    this.dispatch('message', data)

    if (Type.isObject(data)) {
      const { topic } = data || {}
      if (topic) {
        this.dispatch(`message-${topic}`, data)
      }
    }
  }

  #error = event => { }

  #close = event => { }
}
