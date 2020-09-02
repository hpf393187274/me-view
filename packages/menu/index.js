import Menu from './Menu'

Menu.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Menu.name}`, Menu)
}
export default Menu
