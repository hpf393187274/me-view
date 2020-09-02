import List from './List'

List.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${List.name}`, List)
}
export default List
