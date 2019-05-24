import '@assets/styles/common.less'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

import { PREFIX } from './config'
import { type, tools, localStorage, http } from '@assets/script/common'
import { components, mixins } from '@components/index'

export { type, tools, localStorage, http }
/**
 * 内置组件
 */
const innerComponents = ['Icon', 'LineRow', 'Tree', 'TreeHeader', 'TreeNode', 'Button', 'Checkbox']

export default {
  install(Vue, options) {
    const prefix = tools.isEmpty(options) || tools.isEmpty(options.prefix) ? PREFIX : options.prefix
    for (const item of components) {
      if (PREFIX !== prefix && innerComponents.includes(item.name)) {
        Vue.component(PREFIX + item.name, item)
      }
      Vue.component(prefix + item.name, item)
    }

    Vue.component(`${prefix}-chart`, ECharts)

    Vue.mixin(mixins)

    Vue.prototype.$type = type
    Vue.prototype.$tools = tools
    Vue.prototype.$localStorage = localStorage
  }
}
