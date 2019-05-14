export default [
  {
    path: 'tree',
    name: 'Tree',
    component: () => import('@/demo/Tree.vue')
  },
  {
    path: 'transfer',
    name: 'Transfer',
    component: () => import('@/demo/Transfer.vue')
  }
]