import Vue from 'vue'
import App from './src/App'
import router from './router'
import 'highlight.js/styles/color-brewer.css'

import MeView from '../src/index.js'
import MeDemo from './src/components/index'
import './src/style/markdown.css'
Vue.use(MeView)
Vue.use(MeDemo)
Vue.config.productionTip = false
new Vue({
  router,
  mounted () {
    this.$watermark.init('me-view')
  },
  render: h => h(App)
}).$mount('#app')
