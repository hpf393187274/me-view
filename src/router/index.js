import Vue from 'vue'
import Router from 'vue-router'
import DemoChildren from '@router/demo.router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/demo',
      name: 'Demo',
      component: () => import('@/demo/Index.vue'),
      children: DemoChildren
    }
  ]
})
