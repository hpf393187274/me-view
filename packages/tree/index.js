import Tree from './Tree.vue'

Tree.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Tree.name}`, Tree)
}
export default Tree
