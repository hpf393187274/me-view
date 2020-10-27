
import Icon from './Icon'

Icon.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Icon.name}`, Icon)
}
export default Icon
