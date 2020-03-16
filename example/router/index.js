import Vue from 'vue'
import Router from 'vue-router'
import { local } from '@/index'
Vue.use(Router)
// 动态获取路由： 根据目录结构
const routeList = require.context('../../example/docs/', true, /.md$/).keys()
local.set('routeList', routeList)

const children = routeList.flatMap(item => {
  const path = item.replace('./', '/').replace('.md', '')
  const filePath = item.replace('./', '')
  return {
    path,
    component: () => import('@docs/' + filePath)
  }
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/guide/install',
      component: () => import('../layout/index.vue'),
      children: [ ...children ]
    }
  ]
})
