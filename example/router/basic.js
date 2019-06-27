export default [
  { path: '/basic/row', component: () => import( /* webpackChunkName: "example-basic" */ '@docs/basic/Row.md') },
  { path: '/basic/column', component: () => import( /* webpackChunkName: "example-basic" */ '@docs/basic/Column.md') },
  { path: '/basic/icon', component: () => import( /* webpackChunkName: "example-basic" */ '@docs/basic/Icon.md') },
  { path: '/basic/link', component: () => import( /* webpackChunkName: "example-basic" */ '@docs/basic/Link.md') },
  { path: '/basic/line/h', component: () => import( /* webpackChunkName: "example-basic" */ '@docs/basic/LineH.md') },
  { path: '/basic/line/v', component: () => import( /* webpackChunkName: "example-basic" */ '@docs/basic/LineV.md') }
]