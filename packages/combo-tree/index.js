
import ComboTree from './ComboTree'

ComboTree.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${ComboTree.name}`, ComboTree)
}
export default ComboTree
