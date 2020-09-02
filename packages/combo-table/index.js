
import ComboTable from './ComboTable'

ComboTable.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${ComboTable.name}`, ComboTable)
}
export default ComboTable
