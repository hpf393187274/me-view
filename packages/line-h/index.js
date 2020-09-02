
import LineH from './LineH'

LineH.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${LineH.name}`, LineH)
}
export default LineH
