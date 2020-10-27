
import TabPane from '../tabs/TabPane'

TabPane.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${TabPane.name}`, TabPane)
}
export default TabPane
