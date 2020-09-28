import CustomError from 'me-view/src/script/custom-error'
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'
export default class Assert {
  static notEmpty (target, message) {
    if (Tools.isEmpty(target)) {
      throw new CustomError(message, target)
    }
  }

  static notBlank (target, message) {
    if (Tools.isBlank(target)) {
      throw new CustomError(message, target)
    }
  }

  static isArray (target, message) {
    if (Type.notArray(target)) {
      throw new CustomError(message, target)
    }
  }

  /**
   * 有效的数组
   * @param {Array} target 目标
   * @param {String} message 消息
   */
  static validArray (target, message) {
    Assert.isArray(target, message)

    if (target.length === 0) {
      throw new CustomError(message, target)
    }
  }

  static notArray (target, message) {
    if (Type.isArray(target)) {
      throw new CustomError(message, target)
    }
  }

  static emptyArray (target, message) {
    Assert.isArray(target, message)
    if (target.length !== 0) {
      throw new CustomError(message, target)
    }
  }

  static isObject (target, message) {
    if (Type.notObject(target)) {
      throw new CustomError(message, target)
    }
  }

  static notObject (target, message) {
    if (Type.isObject(target)) {
      throw new CustomError(message, target)
    }
  }

  static isFunction (target, message) {
    if (Type.notFunction(target)) {
      throw new CustomError(message, target)
    }
  }

  static isString (target, message) {
    if (Type.notString(target)) {
      throw new CustomError(message, target)
    }
  }
}
