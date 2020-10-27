
import ComboTable from './ComboTable'

ComboTable.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${ComboTable.name}`, ComboTable)
}
export default ComboTable
