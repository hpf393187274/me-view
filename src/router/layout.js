export default [
  {
    path: '/layout/tree',
    component: () => import('@example/layout/tree/Index.vue')
  },
  {
    path: 'layout/transfer',
    component: () => import('@example/layout/transfer/Index.vue')
  }
]