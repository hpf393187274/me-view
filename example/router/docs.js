export default [
  { path: '/docs/test', component: () => import( /* webpackChunkName: "example-docs" */ '@docs/README.md') },
  { path: '/docs/layout', component: () => import( /* webpackChunkName: "example-docs" */ '@docs/layout.md') },
]