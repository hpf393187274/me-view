export default [
  { path: '/form/form', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/form.md') },
  { path: '/form/input', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/input.md') },
  { path: '/form/button', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/button.md') }
]