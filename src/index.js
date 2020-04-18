
import './theme/index.scss'
import Clipboard from 'clipboard'
import config from './config/index'
import * as components from './index-component'
import { local, session, type, tools, http, Watermark } from './index-script'
// import './test'

export * from './index-script'
export * from './index-component'

export default {
  install (Vue) {
    for (const key in components) {
      const item = Reflect.get(components, key)
      Vue.component(item.name, item)
    }

    Vue.prototype.$copy = function (classes) {
      const _this = this
      const clipboard = new Clipboard(classes)
      clipboard.on('success', () => {
        _this.$message.info('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        _this.$message.error('该浏览器不支持自动复制')
        clipboard.destroy()
      })
    }
    Vue.prototype.$dialog = components.Dialog
    Vue.prototype.$message = components.Message
    Vue.prototype.$watermark = Watermark
    Vue.prototype.$config = config
    Vue.prototype.$type = type
    Vue.prototype.$tools = tools
    Vue.prototype.$local = local
    Vue.prototype.$http = http
    Vue.prototype.$session = session
  }
}
