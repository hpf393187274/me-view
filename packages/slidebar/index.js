
import Slidebar from './Slidebar'

Slidebar.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Slidebar.name}`, Slidebar)
}
export default Slidebar
