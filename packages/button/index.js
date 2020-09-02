import Button from './Button'

Button.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Button.name}`, Button)
}
export default Button
