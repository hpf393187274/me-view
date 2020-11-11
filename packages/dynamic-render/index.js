
import DynamicRender from './DynamicRender'

DynamicRender.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${DynamicRender.name}`, DynamicRender)
}
export default DynamicRender
