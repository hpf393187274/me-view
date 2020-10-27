import Tabs from './Tabs'

Tabs.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Tabs.name}`, Tabs)
}
export default Tabs
