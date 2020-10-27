import Transfer from './Transfer.vue'

Transfer.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Transfer.name}`, Transfer)
}
export default Transfer
