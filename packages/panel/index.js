import Panel from './Panel.vue'

Panel.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Panel.name}`, Panel)
}
export default Panel
