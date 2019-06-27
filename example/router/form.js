export default [
  { path: '/form/form', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/Form.md') },
  { path: '/form/input', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/Input.md') },
  { path: '/form/button', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/Button.md') },
  { path: '/form/checkbox', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/Checkbox.md') },
  { path: '/form/combo/select', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/ComboSelect.md') },
  { path: '/form/combo/tree', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/ComboTree.md') },
  { path: '/form/combo/table', component: () => import( /* webpackChunkName: "example-form" */ '@docs/form/ComboTable.md') }
]