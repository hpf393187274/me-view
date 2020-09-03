import Tabs from './Tabs'

Tabs.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Tabs.name}`, Tabs)
}
export default Tabs
