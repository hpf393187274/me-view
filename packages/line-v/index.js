
import LineV from './LineV'

LineV.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${LineV.name}`, LineV)
}
export default LineV
