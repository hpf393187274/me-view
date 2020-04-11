import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/color-brewer.css'
import './style/markdown.less'
import MeView from '../src/index'

import MeDemo from './components/index'
Vue.use(MeView)
Vue.use(MeDemo)
Vue.config.productionTip = false
new Vue({
  router,
  mounted () {
    this.$watermark.set('me-view')
  },
  render: h => h(App)
}).$mount('#app')
