import '@assets/styles/common.less'

import { components } from '@/example/index'

export default {
  install(Vue) {
    for (const item of components) {
      Vue.component(item.name, item)
    }
  }
}
