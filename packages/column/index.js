
import Column from './Column'

Column.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Column.name}`, Column)
}
export default Column
