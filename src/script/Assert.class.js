import CustomError from './CustomError.class'
import type from './Type.class'
import tools from './Tools.class'
export default class Assert {
  static notEmpty (target, message) {
    if (tools.isEmpty(target)) {
      throw new CustomError(message, target)
    }
  }

  static isArray (target, message) {
    if (type.notArray(target)) {
      throw new CustomError(message, target)
    }
  }

  static notArray (target, message) {
    if (type.isArray(target)) {
      throw new CustomError(message, target)
    }
  }

  static emptyArray (target, message) {
    if (type.notArray(target) || target.length === 0) {
      throw new CustomError(message, target)
    }
  }

  static isObject (target, message) {
    if (type.notObject(target)) {
      throw new CustomError(message, target)
    }
  }

  static notObject (target, message) {
    if (type.isObject(target)) {
      throw new CustomError(message, target)
    }
  }

  static isFunction (target, message) {
    if (type.notFunction(target)) {
      throw new CustomError(message, target)
    }
  }

  static isString (target, message) {
    if (type.notString(target)) {
      throw new CustomError(message, target)
    }
  }
}
