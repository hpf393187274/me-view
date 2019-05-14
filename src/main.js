import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueView from '@/index'
Vue.use(VueView)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')