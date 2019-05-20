import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueView from '@/index'
Vue.use(VueView)
Vue.config.productionTip = false
import Watermark from '@assets/script/watermark'
new Vue({
  router,
  mounted: function () {
    Watermark.set("我们都是好孩子")
  },
  render: h => h(App)
}).$mount('#app')