export default [
  { path: '/layout/table', component: () => import( /* webpackChunkName: "example-layout" */ '@example/layout/table/Index.vue') },
  { path: '/layout/paging', component: () => import( /* webpackChunkName: "example-layout" */ '@example/layout/paging/Index.vue') },
  { path: '/layout/tree', component: () => import( /* webpa ckChunkName: "example-layout" */'@example/layout/tree/Index.vue') },
  { path: '/layout/transfer', component: () => import( /* webpackChunkName: "example-layout" */ '@example/layout/transfer/Index.vue') }
]