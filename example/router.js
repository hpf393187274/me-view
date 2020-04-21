import Vue from 'vue'
import Router from 'vue-router'
import { local } from 'me-view/src/index'
Vue.use(Router)
console.log('---------------e-------')
// 动态获取路由： 根据目录结构
const routeList = require.context('./src/docs/', true, /.md$/).keys()
local.set('routeList', routeList)
console.log('---------------routeList-------', routeList)
const children = routeList.flatMap(item => {
  const path = item.replace('./', '/').replace('.md', '')
  const filePath = item.replace('./', '')
  return {
    path,
    component: () => import('me-view/example/src/docs/' + filePath)
  }
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/guide/install',
      component: () => import('./src/layout/index.vue'),
      children: [...children]
    }
  ]
})
