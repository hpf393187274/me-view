
import ComboSelect from './ComboSelect'

ComboSelect.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${ComboSelect.name}`, ComboSelect)
}
export default ComboSelect
