
import Column from './Column'

Column.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Column.name}`, Column)
}
export default Column
