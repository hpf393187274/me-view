import '@assets/styles/common.less'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

import { type, tools, local, session, http } from '@assets/script/common'
import { components, mixins, config } from '@components/index'
import watermark from '@assets/script/watermark'

import Dialog from '@components/view/dialog/index'
export { type, tools, local, session, http, watermark, Dialog }

export default {
  install(Vue) {
    for (const item of components) {
      Vue.component(item.name, item)
    }
    Vue.component('me-chart', ECharts)

    Vue.mixin(mixins)
    Vue.prototype.$config = config
    Vue.prototype.$dialog = Dialog

    Vue.prototype.$watermark = watermark
    Vue.prototype.$type = type
    Vue.prototype.$tools = tools
    Vue.prototype.$local = local
    Vue.prototype.$session = session
  }
}
