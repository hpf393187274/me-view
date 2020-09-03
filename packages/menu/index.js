import Menu from './Menu'

Menu.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Menu.name}`, Menu)
}
export default Menu
