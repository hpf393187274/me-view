import Transfer from './Transfer.vue'

Transfer.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Transfer.name}`, Transfer)
}
export default Transfer
