
import Combo from './Combo'

Combo.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Combo.name}`, Combo)
}
export default Combo
