import Vue from 'vue'
import Router from 'vue-router'
import { local } from 'me-view/src/index'
Vue.use(Router)
// 动态获取路由： 根据目录结构
const routeDoc = require.context('./src/docs/', true, /.md$/).keys()
local.set('routeDoc', routeDoc)
console.debug('---------------route-doc-------', routeDoc)
const childrenDoc = routeDoc.flatMap(item => {
  const path = item.replace('./', '/').replace('.md', '')
  const filePath = item.replace('./', '')
  return {
    path: `/doc${path}`,
    component: () => import('me-view/example/src/docs/' + filePath)
  }
})

const routeDemo = require.context('./src/demo/', true, /.vue$/).keys()
local.set('routeDemo', routeDemo)
console.debug('---------------route-demo-------', routeDemo)
const childrenDemo = routeDemo.flatMap(item => {
  const path = item.replace('./', '/').replace('.vue', '')
  const filePath = item.replace('./', '')
  return {
    path: `/demo${path}`,
    component: () => import('me-view/example/src/demo/' + filePath)
  }
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/doc/guide/install',
      component: () => import('./src/layout/index.vue'),
      children: [...childrenDoc, ...childrenDemo]
    }
  ]
})
