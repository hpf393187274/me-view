
export default class Type {
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
  static getType (target) {
    return toString.call(target)
  }

  static isDate (target) {
    return Type.getType(target) === Type.TYPE_DATE
  }

  static isFile (target) {
    return Type.getType(target) === Type.TYPE_FILE
  }

  static isBlog (target) {
    return Type.getType(target) === Type.TYPE_BLOB
  }

  /**
   * 校验：Boolean：true
   * @param target
   * @returns {Boolean}
   */
  static isBoolean (target) {
    const type = Type.getType(target)
    return type === Type.TYPE_BOOLEAN
  }

  /**
   * 校验：Boolean：false
   * @param target
   * @returns {Boolean}
   */
  static notBoolean (target) {
    return Type.isBoolean(target)
  }

  /**
   * Number：true
   * @param target 目标值
   * @returns {Boolean}
   */
  static isNumber (target) {
    var type = Type.getType(target)
    return type === Type.TYPE_NUMBER
  }

  /**
   * Number：false
   * @param target 目标值
   * @returns {Boolean}
   */
  static notNumber (target) {
    return !Type.isNumber(target)
  }

  /**
   * String：true
   * @param target 目标值
   * @returns {Boolean}
   */
  static isString (target) {
    var type = Type.getType(target)
    return type === Type.TYPE_STRING
  }

  /**
   * String：false
   * @param target 目标值
   * @returns {Boolean}
   */
  static notString (target) {
    return !Type.isString(target)
  }

  /**
   * Object Or Array：true
   * @param target 目标值
   * @returns {Boolean}
   */
  static isObjectOrArray (target) {
    var type = Type.getType(target)
    return type === Type.TYPE_OBJECT || type === Type.TYPE_ARRAY
  }

  /**
   * Object Or Array：false
   * @param target 目标值
   * @returns {Boolean}
   */
  static notObjectOrArray (target) {
    return !Type.isObjectOrArray(target)
  }

  /**
   * Object：true
   * @param target 目标值
   * @returns {Boolean}
   */
  static isObject (target) {
    return Type.getType(target) === Type.TYPE_OBJECT
  }

  /**
   * Object：false
   * @param target 目标值
   * @returns {Boolean}
   */
  static notObject (target) {
    return !Type.isObject(target)
  }

  /**
   * Array：true
   * @param target 目标值
   * @returns {Boolean}
   */
  static isArray (target) {
    return Type.getType(target) === Type.TYPE_ARRAY
  }

  /**
   * Array：false
   * @param target 目标值
   * @returns {Boolean}
   */
  static notArray (target) {
    return !Type.isArray(target)
  }

  static isRegExp (target) {
    return Type.getType(target) === Type.TYPE_REGEXP
  }

  /**
   * Funciton：true
   * @param target 目标值
   * @returns {Boolean}
   */
  static isFunction (target) {
    return Type.getType(target) === Type.TYPE_FUNCTION
  }

  /**
   * Funciton：false
   * @param target 目标值
   * @returns {Boolean}
   */
  static notFunction (target) {
    return !Type.isFunction(target)
  }
}
