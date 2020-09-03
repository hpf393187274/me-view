import Textarea from './Textarea'
Textarea.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Textarea.name}`, Textarea)
}
export default Textarea
