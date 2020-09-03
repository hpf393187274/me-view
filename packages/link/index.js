import Link from './Link'

Link.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Link.name}`, Link)
}
export default Link
