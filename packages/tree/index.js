import Tree from './Tree.vue'

Tree.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Tree.name}`, Tree)
}
export default Tree
