import Paging from './Paging'

Paging.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Paging.name}`, Paging)
}
export default Paging
