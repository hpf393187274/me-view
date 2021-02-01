
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
  static TYPE_ERROR = '[object Error]'
  static TYPE_PROMISE = '[object Promise]'
  static TYPE_ASYNC_FUNCTION = '[object AsyncFunction]'

  /**
   * 获取类型
   * @param target 目标值
   * @returns {string}
   */
  static getType (target) {
    return Object.prototype.toString.call(target)
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

  static isAsyncFunction (target) {
    return Type.getType(target) === Type.TYPE_ASYNC_FUNCTION
  }

  static isPromise (target) {
    return Type.getType(target) === Type.TYPE_PROMISE
  }

  /**
   * Funciton：false
   * @param target 目标值
   * @returns {Boolean}
   */
  static notFunction (target) {
    return !Type.isFunction(target)
  }

  static isError (target) {
    return Type.getType(target) === Type.TYPE_ERROR
  }

  /**
   * 校验：对象是否为空
   * @param {Object} target 目标
   */
  static isEmpty (target) {
    return target === null || target === undefined
  }

  /**
   * 校验：是否为空 或 空串
   * @param {Object} target 目标
   */
  static isEmptyString (target) {
    if (Type.isEmpty(target)) { return true }
    if (Type.isString(target)) {
      const value = Type.trim(target)
      return value === '' || value === 'null' || value === 'undefined'
    }
    return false
  }

  /**
   * 校验：是否为空 或 空对象
   * @param {Object} target 目标
   */
  static isEmptyObject (target) {
    if (Type.isEmpty(target)) { return true }
    if (Type.isObject(target)) {
      return Object.keys(target).length === 0
    }
    return false
  }

  /**
   * 校验：是否为空 或 空数组
   * @param {Object} target 目标
   */
  static isEmptyArray (target) {
    if (Type.isEmpty(target)) { return true }
    if (Type.isArray(target)) {
      return target.length === 0
    }
    return false
  }

  /**
   * 校验：是否为空值
   * @param {Object} target 目标
   */
  static isBlank (target) {
    if (Type.isEmpty(target)) { return true }
    if (Type.isString(target)) {
      return [ '', 'null', 'undefined' ].includes(Type.trim(target))
    }
    if (Type.isArray(target)) {
      return target.length === 0
    }
    if (Type.isObject(target)) {
      return Object.keys(target).length === 0
    }
    return false
  }

  /**
   * 去除字符串两边的空格
   * @param {String} target 目标字符串
   */
  static trim (target) {
    if (Type.isString(target)) {
      return target.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    }
    return target
  }
}
