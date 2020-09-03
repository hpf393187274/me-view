import Label from './Label'

Label.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Label.name}`, Label)
}
export default Label
