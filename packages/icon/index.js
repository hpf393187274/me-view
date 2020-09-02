
import Icon from './Icon'

Icon.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Icon.name}`, Icon)
}
export default Icon
