import Panel from './Panel.vue'

Panel.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Panel.name}`, Panel)
}
export default Panel
