
import Modal from './Modal'

Modal.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${Modal.name}`, Modal)
}
export default Modal
