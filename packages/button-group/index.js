import ButtonGroup from './ButtonGroup'

ButtonGroup.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${ButtonGroup.name}`, ButtonGroup)
}
export default ButtonGroup
