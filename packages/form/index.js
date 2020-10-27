import Form from './Form.vue'

Form.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Form.name}`, Form)
}
export default Form
