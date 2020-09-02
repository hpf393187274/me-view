import Link from './Link'

Link.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Link.name}`, Link)
}
export default Link
