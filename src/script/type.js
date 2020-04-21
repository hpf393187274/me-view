
class Type {
  static TYPE_NUMBER = '[object Number]'
  static TYPE_BOOLEAN = '[object Boolean]'
  static TYPE_OBJECT = '[object Object]'
  static TYPE_ARRAY = '[object Array]'
  static TYPE_FUNCTION = '[object Function]'
  static TYPE_STRING = '[object String]'
  static TYPE_REGEXP = '[object RegExp]'
  static TYPE_BLOB = '[object Blob]'
  static TYPE_FILE = '[object File]'
  static TYPE_DATE = '[object Date]'

  /**
   * 获取类型
   * @param target 目标值
   * @returns {string}
   */
  getType (target) {
    return toString.call(target)
  }

  isDate (target) {
    return this.getType(target) === Type.TYPE_DATE
  }

  isFile (target) {
    return this.getType(target) === Type.TYPE_FILE
  }

  isBlog (target) {
    return this.getType(target) === Type.TYPE_BLOB
  }

  /**
   * 校验：Boolean：true
   * @param target
   * @returns {Boolean}
   */
  isBoolean (target) {
    const type = this.getType(target)
    return type === Type.TYPE_BOOLEAN
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
    return type === Type.TYPE_NUMBER
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
    return type === Type.TYPE_STRING
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
    return type === Type.TYPE_OBJECT || type === Type.TYPE_ARRAY
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
    return this.getType(target) === Type.TYPE_OBJECT
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
    return this.getType(target) === Type.TYPE_ARRAY
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
    return this.getType(target) === Type.TYPE_REGEXP
  }

  /**
   * Funciton：true
   * @param target 目标值
   * @returns {Boolean}
   */
  isFunction (target) {
    return this.getType(target) === Type.TYPE_FUNCTION
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
