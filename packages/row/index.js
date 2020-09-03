import Row from './Row'

Row.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Row.name}`, Row)
}
export default Row
