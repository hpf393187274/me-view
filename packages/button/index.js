import Button from './Button'

Button.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Button.name}`, Button)
}
export default Button
