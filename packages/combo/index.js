
import Combo from './Combo'

Combo.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Combo.name}`, Combo)
}
export default Combo
