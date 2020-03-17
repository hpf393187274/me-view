// const TYPE_NULL = '[object Null]'
// const TYPE_UNDEFINED = '[object Undefined]'
const TYPE_NUMBER = '[object Number]'
const TYPE_BOOLEAN = '[object Boolean]'
const TYPE_OBJECT = '[object Object]'
const TYPE_ARRAY = '[object Array]'
const TYPE_FUNCTION = '[object Function]'
const TYPE_STRING = '[object String]'
const TYPE_REGEXP = '[object RegExp]'
const TYPE_BLOB = '[object Blob]'

class Type {
  /**
   * 获取类型
   * @param target 目标值
   * @returns {string}
   */
  getType (target) {
    return toString.call(target)
  }

  isBlog (target) {
    const type = this.getType(target)
    return type === TYPE_BLOB
  }

  /**
   * 校验：Boolean：true
   * @param target
   * @returns {Boolean}
   */
  isBoolean (target) {
    const type = this.getType(target)
    return type === TYPE_BOOLEAN
  }

  /**
   * 校验：Boolean：false
   * @param target
   * @returns {Boolean}
   */
  notBoolean (target) {
    return this.isBoolean(target)
  }

  /**
   * Number：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isNumber (target) {
    var type = this.getType(target)
    return type === TYPE_NUMBER
  }

  /**
   * Number：false
   * @param target 目标值
   * @returns {Boolean}
   */
  notNumber (target) {
    return !this.isNumber(target)
  }

  /**
   * String：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isString (target) {
    var type = this.getType(target)
    return type === TYPE_STRING
  }

  /**
   * String：false
   * @param target 目标值
   * @returns {Boolean}
   */
  notString (target) {
    return !this.isString(target)
  }

  /**
   * Object Or Array：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isObjectOrArray (target) {
    var type = this.getType(target)
    return type === TYPE_OBJECT || type === TYPE_ARRAY
  }

  /**
   * Object Or Array：false
   * @param target 目标值
   * @returns {Boolean}
   */
  notObjectOrArray (target) {
    return !this.isObjectOrArray(target)
  }

  /**
   * Object：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isObject (target) {
    return this.getType(target) === TYPE_OBJECT
  }

  /**
   * Object：false
   * @param target 目标值
   * @returns {Boolean}
   */
  notObject (target) {
    return !this.isObject(target)
  }

  /**
   * Array：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isArray (target) {
    return this.getType(target) === TYPE_ARRAY
  }

  /**
   * Array：false
   * @param target 目标值
   * @returns {Boolean}
   */
  notArray (target) {
    return !this.isArray(target)
  }

  isRegExp (target) {
    return this.getType(target) === TYPE_REGEXP
  }

  /**
   * Funciton：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isFunction (target) {
    return this.getType(target) === TYPE_FUNCTION
  }

  /**
   * Funciton：false
   * @param target 目标值
   * @returns {Boolean}
   */
  notFunction (target) {
    return !this.isFunction(target)
  }
}

export default new Type()
