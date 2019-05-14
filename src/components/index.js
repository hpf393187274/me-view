
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@assets/styles/common.less'
import '@assets/styles/business.less'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

import { PREFIX } from './config'

import { components, innerComponents, common, mixins } from './container'
export default {
  install(Vue, options) {
    const prefix = common.tools.isEmpty(options.prefix) ? options.prefix : PREFIX
    for (const item of [...components, ECharts]) {
      Vue.component(prefix + item.name, item)
    }
    for (const item of innerComponents) {
      Vue.component(PREFIX + item.name, item)
    }

    Vue.mixin(mixins)
    Vue.use(ElementUI)

    Vue.prototype.$type = common.type
    Vue.prototype.$tools = common.tools
    Vue.prototype.$localStorage = common.localStorage
  }
}
