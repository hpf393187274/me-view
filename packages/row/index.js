import Row from './Row'

Row.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Row.name}`, Row)
}
export default Row
