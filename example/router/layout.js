export default [
  { path: '/layout/table', component: () => import( /* webpackChunkName: "example-layout" */ '@docs/layout/table.md') },
  { path: '/layout/paging', component: () => import( /* webpackChunkName: "example-layout" */ '@docs/layout/Paging.md') },
  { path: '/layout/tree', component: () => import( /* webpa ckChunkName: "example-layout" */'@docs/layout/Tree.md') },
  { path: '/layout/dialog', component: () => import( /* webpa ckChunkName: "example-layout" */'@docs/layout/Dialog.md') },
  { path: '/layout/transfer', component: () => import( /* webpackChunkName: "example-layout" */ '@docs/layout/Transfer.md') }
]