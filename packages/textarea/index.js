import Textarea from './Textarea'
Textarea.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Textarea.name}`, Textarea)
}
export default Textarea
