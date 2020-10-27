
import LineV from './LineV'

LineV.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${LineV.name}`, LineV)
}
export default LineV
