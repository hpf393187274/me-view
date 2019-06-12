export default [
  { path: '/layout/table', component: () => import( /* webpackChunkName: "example-layout" */ '@example/components/layout/table/Index.vue') },
  { path: '/layout/paging', component: () => import( /* webpackChunkName: "example-layout" */ '@example/components/layout/paging/Index.vue') },
  { path: '/layout/tree', component: () => import( /* webpa ckChunkName: "example-layout" */'@example/components/layout/tree/Index.vue') },
  { path: '/layout/transfer', component: () => import( /* webpackChunkName: "example-layout" */ '@example/components/layout/transfer/Index.vue') }
]