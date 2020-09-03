import Form from './Form.vue'

Form.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Form.name}`, Form)
}
export default Form
