import Vue from 'vue'
import Router from 'vue-router'
import basic from './basic'
import layout from './layout'
import form from './form'
import common from './common'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('../Layout.vue'),
      children: [...layout, ...form, ...basic, ...common]
    }
  ]
})
