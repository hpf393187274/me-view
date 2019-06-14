import '@assets/styles/common.less'

import DemoBlock from '@docs/DemoBlock'

export default {
  install(Vue) {

    Vue.component(DemoBlock.name, DemoBlock)
  }
}
