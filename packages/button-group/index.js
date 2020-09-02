import ButtonGroup from './ButtonGroup'

ButtonGroup.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${ButtonGroup.name}`, ButtonGroup)
}
export default ButtonGroup
