import Scrollbar from './Scrollbar'

Scrollbar.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Scrollbar.name}`, Scrollbar)
}
export default Scrollbar
