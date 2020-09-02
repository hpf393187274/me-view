import Label from './Label'

Label.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Label.name}`, Label)
}
export default Label
