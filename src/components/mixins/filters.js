import { tools, type } from '@assets/script/common'
export default {
  isEmpty(value, defaultValue) {
    return tools.isEmpty(value) ? defaultValue : value
  },
  includes(value, target) {
    if (type.isArray(target)) {
      return target.includes(value)
    }
    return false
  },
  boolean(value) { return tools.isNotEmpty(value) }
}