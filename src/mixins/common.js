import tools from 'me-view/src/script/tools'
import type from 'me-view/src/script/type'
export default {
  filters: {
    isEmpty (value, defaultValue) {
      return tools.isEmpty(value) ? defaultValue : value
    },
    includes (value, target) {
      if (type.isArray(target)) {
        return target.includes(value)
      }
      return false
    },
    boolean (value) { return tools.notEmpty(value) }
  },
  methods: {
    /**
     *
     * @param {String} value
     */
    isBoolean (value) { return tools.notEmpty(value) }
  }
}
