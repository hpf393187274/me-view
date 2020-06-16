import './theme/index.scss'
import Clipboard from 'clipboard'
import * as components from './index-component'
import { local, session, Type, Tools, Watermark } from './script/index'

// import './test/index'

export * from './script/index'
export * from './index-component'

export default {
  install (Vue) {
    for (const key in components) {
      const item = Reflect.get(components, key)
      Vue.component(item.name, item)
    }

    Vue.prototype.$copy = function (target, { prompt = false, message = '复制成功' } = {}) {
      const clipboard = new Clipboard(target)
      clipboard.on('success', () => {
        if (prompt === true) {
          this.$message.info(message)
        } else {
          console.info('Clipboard ----> copy error：', message)
        }
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        const message = '该浏览器不支持自动复制'
        if (prompt === true) {
          this.$message.error(message)
        } else {
          console.warn('Clipboard ----> copy error：', message)
        }
        clipboard.destroy()
      })
    }

    const { Dialog, Message } = components
    Vue.prototype.$dialog = Dialog
    Vue.prototype.$message = Message
    Vue.prototype.$watermark = new Watermark()
    Vue.prototype.$type = Type
    Vue.prototype.$tools = Tools
    Vue.prototype.$local = local
    Vue.prototype.$session = session
  }
}
