import '@assets/styles/common.less'

import { PREFIX } from './config'
import { components, mixins } from '@/example/index'

export default {
  install(Vue) {
    for (const item of components) {
      Vue.component(PREFIX + item.name, item)
    }
    Vue.mixin(mixins)
  }
}
