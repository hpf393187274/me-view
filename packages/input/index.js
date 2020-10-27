import Input from './Input'

Input.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Input.name}`, Input)
}
export default Input
