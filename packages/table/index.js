import Table from './Table.vue'
Table.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Table.name}`, Table)
}
export default Table
