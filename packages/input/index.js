import Input from './Input'

Input.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Input.name}`, Input)
}
export default Input
