import Vue from 'vue'
import Router from 'vue-router'
import layout from './layout'
import form from './form'

import docs from './docs'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('../components/Index.vue'),
      children: [...layout, ...form]
    },
    ...docs
  ]
})
