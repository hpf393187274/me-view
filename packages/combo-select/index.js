
import ComboSelect from './ComboSelect'
import Config from 'me-view/src/config/index'
ComboSelect.install = Vue => {
  Vue.component(ComboSelect.name, ComboSelect)
  Vue.$config = Config
}
export default ComboSelect
