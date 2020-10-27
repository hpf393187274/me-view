
import Modal from './Modal'

Modal.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${Modal.name}`, Modal)
}
export default Modal
