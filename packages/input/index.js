import Input from './Input'
import Config from 'me-view/src/config/index'
Input.install = Vue => {
  Vue.component(Input.name, Input)
  Vue.config = Config
}
export default Input
