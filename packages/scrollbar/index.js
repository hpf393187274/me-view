import Scrollbar from './Scrollbar'

Scrollbar.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Scrollbar.name}`, Scrollbar)
}
export default Scrollbar
