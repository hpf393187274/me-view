import Tools from 'me-view/src/script/tools'
import Type from 'me-view/src/script/type'
import Config from 'me-view/src/config/index'
export default {
  filters: {
    isEmpty (value, defaultValue) {
      return Tools.isEmpty(value) ? defaultValue : value
    },
    includes (value, target) {
      if (Type.isArray(target)) {
        return target.includes(value)
      }
      return false
    },
    boolean (value) { return Tools.notEmpty(value) }
  },
  computed: {
    $config () {
      return Config
    }
  },
  methods: {
    /**
     *
     * @param {String} value
     */
    isBoolean (value) { return Tools.notEmpty(value) }
  }
}
