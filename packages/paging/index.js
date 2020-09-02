import Paging from './Paging'

Paging.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Paging.name}`, Paging)
}
export default Paging
