
import ComboSelect from './ComboSelect'

ComboSelect.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${ComboSelect.name}`, ComboSelect)
}
export default ComboSelect
