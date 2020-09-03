
import TabPane from '../tabs/TabPane'

TabPane.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${TabPane.name}`, TabPane)
}
export default TabPane
