import Checkbox from './Checkbox'

Checkbox.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Checkbox.name}`, Checkbox)
}
export default Checkbox
