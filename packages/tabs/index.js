
import Tabs from './Tabs'
import TabPane from './TabPane'
TabPane.install = Vue => Vue.component(TabPane.name, TabPane)
Tabs.TabPane = TabPane
Tabs.install = Vue => Vue.component(Tabs.name, Tabs)
export default Tabs
