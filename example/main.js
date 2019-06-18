import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/color-brewer.css'
import './style/markdown.less'
import meView from '@/index'
import meExample from './example.js'
Vue.use(meView)
Vue.use(meExample)
Vue.config.productionTip = false
new Vue({
  router,
  mounted: function () {
    this.$watermark.set("me-view")
  },
  render: h => h(App)
}).$mount('#app')