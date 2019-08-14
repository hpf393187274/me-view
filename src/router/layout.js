export default [
  { path: '/layout/table', component: () => import( /* webpackChunkName: "example-layout" */ '@example/layout/Table.vue') },
  { path: '/layout/dialog', component: () => import( /* webpackChunkName: "example-layout" */ '@example/layout/Dialog.vue') }
]