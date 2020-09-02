import Table from './Table.vue'
Table.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Table.name}`, Table)
}
export default Table
