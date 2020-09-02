import List from './List'

List.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${List.name}`, List)
}
export default List
