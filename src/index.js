import '@assets/styles/common.less'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

import { type, tools, localStorage, http } from '@assets/script/common'
import { components, mixins } from '@components/index'

export { type, tools, localStorage, http }

export default {
  install(Vue) {
    for (const item of components) {
      Vue.component(item.name, item)
    }
    Vue.component('me-chart', ECharts)

    Vue.mixin(mixins)

    Vue.prototype.$type = type
    Vue.prototype.$tools = tools
    Vue.prototype.$localStorage = localStorage
  }
}
