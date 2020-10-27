
import LineH from './LineH'

LineH.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${LineH.name}`, LineH)
}
export default LineH
