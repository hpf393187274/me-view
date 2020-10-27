
import Slidebar from './Slidebar'

Slidebar.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Slidebar.name}`, Slidebar)
}
export default Slidebar
