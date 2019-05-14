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
import { type, tools, localStorage, http } from '@assets/script/common'
import { components, innerComponents, mixins } from '@components/index'

export { type, tools, localStorage, http }
export default {
  install(Vue, options) {
    const prefix = tools.isEmpty(options) || tools.isEmpty(options.prefix) ? PREFIX : options.prefix
    for (const item of components) {
      console.log(item)
      Vue.component(prefix + item.name, () => import(`@components/${item.path}`))
    }
    Vue.component(`${prefix}-chart`, ECharts)

    for (const item of innerComponents) {
      console.log(item)
      Vue.component(PREFIX + item.name, () => import(`@components/${item.path}`))
    }

    Vue.mixin(mixins)
    Vue.use(ElementUI)

    Vue.prototype.$type = type
    Vue.prototype.$tools = tools
    Vue.prototype.$localStorage = localStorage
  }
}
