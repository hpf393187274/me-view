
import ComboTree from './ComboTree'

ComboTree.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${ComboTree.name}`, ComboTree)
}
export default ComboTree
