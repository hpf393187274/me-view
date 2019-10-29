export default {
  TYPE_Null: '[object Null]',
  TYPE_UNDEFINED: '[object Undefined]',
  TYPE_NUMBER: '[object Number]',
  TYPE_BOOLEAN: '[object Boolean]',
  TYPE_OBJECT: '[object Object]',
  TYPE_ARRAY: '[object Array]',
  TYPE_FUNCTION: '[object Function]',
  TYPE_String: '[object String]',
  TYPE_REGEXP: '[object RegExp]',
  isBoolean(target) {
    var type = this.getType(target)
    return type === this.TYPE_BOOLEAN
  },
  isNotBoolean(target) {
    return this.isBoolean(target)
  },
  /**
   * Number：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isNumber(target) {
    var type = this.getType(target)
    return type === this.TYPE_NUMBER
  },
  /**
   * Number：false
   * @param target 目标值
   * @returns {Boolean}
   */
  isNotNumber(target) {
    return !this.isNumber(target)
  },
  /**
   * String：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isString(target) {
    var type = this.getType(target)
    return type === this.TYPE_String
  },
  /**
   * String：false
   * @param target 目标值
   * @returns {Boolean}
   */
  isNotString(target) {
    return !this.isString(target)
  },
  /**
   * Object Or Array：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isObjectOrArray(target) {
    var type = this.getType(target)
    return type === this.TYPE_OBJECT || type === this.TYPE_ARRAY
  },
  /**
   * Object Or Array：false
   * @param target 目标值
   * @returns {Boolean}
   */
  isNotObjectOrArray(target) {
    return !this.isObjectOrArray(target)
  },
  /**
   * Object：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isObject(target) {
    return this.getType(target) === this.TYPE_OBJECT
  },
  /**
   * Object：false
   * @param target 目标值
   * @returns {Boolean}
   */
  isNotObject(target) {
    return !this.isObject(target)
  },
  /**
   * Array：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isArray(target) {
    return this.getType(target) === this.TYPE_ARRAY
  },
  /**
   * Array：false
   * @param target 目标值
   * @returns {Boolean}
   */
  isNotArray(target) {
    return !this.isArray(target)
  },
  /**
   * 获取类型
   * @param target 目标值
   * @returns {string}
   */
  getType(target) {
    return toString.call(target)
  },
  isRegExp(target) {
    return this.getType(target) === this.TYPE_REGEXP
  },
  /**
   * Funciton：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isFunction(target) {
    return this.getType(target) === this.TYPE_FUNCTION
  },
  /**
   * Funciton：false
   * @param target 目标值
   * @returns {Boolean}
   */
  isNotFunction(target) {
    return !this.isFunction(target)
  }
}
