export default [
  { path: '/form/button', component: () => import( /* webpackChunkName: "example-form" */ '@example/form/Button.vue') },
  { path: '/form/input', component: () => import( /* webpackChunkName: "example-form" */ '@example/form/Input.vue') }
]