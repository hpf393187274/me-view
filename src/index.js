import '@assets/styles/index.scss'
import '@assets/styles/icon.css'

import { components, mixins, config } from '@components/index'
import watermark from '@assets/script/watermark'

import Dialog from '@components/view/dialog/index'
import Message from '@components/view/message/index'

import Clipboard from 'clipboard'
import { local, session, type, tools, http } from '@assets/script/common'

export * from '@assets/script/common'

export default {
  install (Vue) {
    for (const item of components) {
      Vue.component(item.name, item)
    }
    Vue.mixin(mixins)
    Vue.prototype.$config = config
    Vue.prototype.$dialog = Dialog
    Vue.prototype.$message = Message

    Vue.prototype.$watermark = watermark
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
    Vue.prototype.$type = type
    Vue.prototype.$tools = tools
    Vue.prototype.$local = local
    Vue.prototype.$http = http
    Vue.prototype.$session = session
  }
}
