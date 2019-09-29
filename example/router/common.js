export default [
  { path: '/common/tools', component: () => import( /* webpackChunkName: "example-common" */ '@docs/common/Tools.md') },
  { path: '/common/type', component: () => import( /* webpackChunkName: "example-common" */ '@docs/common/Type.md') },
  { path: '/common/storage', component: () => import( /* webpackChunkName: "example-common" */ '@docs/common/Storage.md') }
]