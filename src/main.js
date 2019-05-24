import Vue from 'vue'
import App from './App.vue'
import router from './router'

import meView from '@/index'
import meExample from '@/example'
Vue.use(meView)
Vue.use(meExample)
Vue.config.productionTip = false
import Watermark from '@assets/script/watermark'
new Vue({
  router,
  mounted: function () {
    Watermark.set("me-view")
  },
  render: h => h(App)
}).$mount('#app')