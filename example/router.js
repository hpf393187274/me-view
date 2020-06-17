import Vue from 'vue'
import Router from 'vue-router'
import { local } from 'me-view/src/index'
Vue.use(Router)

/**
 * 转换为 '-' 替换驼峰命名
 * @param {String} target 名称
 */
function formatFileName (target) {
  const connector = '-'
  target = target.replace(/([A-Z])/g, $1 => connector + $1.toLowerCase())
  return target.replace('/-', '/')
}

// 动态获取路由： 根据目录结构
const fileDoc = require.context('./src/docs/', true, /.md$/).keys()
const routeDoc = []
console.debug('---------------route-doc-------', fileDoc)
const childrenDoc = fileDoc.flatMap(item => {
  let path = item.replace('./', '/').replace('.md', '')
  path = formatFileName(path)
  routeDoc.push(path)
  const filePath = item.replace('./', '')
  return {
    path: `/doc${path}`,
    component: () => import('me-view/example/src/docs/' + filePath)
  }
})
local.set('routeDoc', routeDoc)
const fileDemo = require.context('./src/demo/', true, /.vue$/).keys()

console.debug('---------------route-demo-------', fileDemo)
const routeDemo = []
const childrenDemo = fileDemo.flatMap(item => {
  let path = item.replace('./', '/').replace('.vue', '')
  path = formatFileName(path)
  routeDemo.push(path)
  const filePath = item.replace('./', '')
  return {
    path: `/demo${path}`,
    component: () => import('me-view/example/src/demo/' + filePath)
  }
})
local.set('routeDemo', routeDemo)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/doc/guide/install',
      component: () => import('./src/layout/index.vue'),
      children: [
        {
          path: '/doc',
          component: () => import('./src/layout/MainDocs.vue'),
          children: [...childrenDoc]
        },
        {
          path: '/demo',
          component: () => import('./src/layout/MainDemo.vue'),
          children: [...childrenDemo]
        }
      ]
    }
  ]
})
