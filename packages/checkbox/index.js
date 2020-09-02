import Checkbox from './Checkbox'

Checkbox.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Checkbox.name}`, Checkbox)
}
export default Checkbox
