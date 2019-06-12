import '@assets/styles/common.less'

import { components } from '@example/components/index'

import DemoBlock from '@docs/components/DemoBlock'

export default {
  install(Vue) {
    for (const item of components) {
      Vue.component(item.name, item)
    }
    Vue.component(DemoBlock.name, DemoBlock)
  }
}
