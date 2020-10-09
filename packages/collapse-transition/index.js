
import CollapseTransition from './CollapseTransition'

CollapseTransition.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${CollapseTransition.name}`, CollapseTransition)
}
export default CollapseTransition
