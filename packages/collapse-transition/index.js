
import CollapseTransition from './CollapseTransition'

CollapseTransition.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${CollapseTransition.name}`, CollapseTransition)
}
export default CollapseTransition
