import { tools } from '@assets/script/common'
export default {
  isEmpty(value, defaultValue) {
    return tools.isEmpty(value) ? defaultValue : value
  }
}