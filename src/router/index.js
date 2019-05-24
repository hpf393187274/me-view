import Vue from 'vue'
import Router from 'vue-router'
import layout from '@router/layout'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@example/Index.vue'),
      children: [...layout]
    }
  ]
})
