import type from './type.common'
export default {
  /**
   * 校验：对象是否为空
   * @param {Object} target 目标
   */
  isEmpty(target) {
    if (target === null || target === undefined) { return true }
    if (type.isArray(target) && target.length === 0) { return true }
    if (type.isObject(target) && Object.keys(target).length === 0) { return true }
    if (type.isString(target)) {
      const value = this.trim(target)
      return value === '' || value === 'null' || value === 'undefined'
    }
    return false
  },
  /**
   * 校验：对象是否为空
   * @param {Object} target 目标
   */
  isNotEmpty(target) {
    return !this.isEmpty(target)
  },
  /**
   * 去除字符串两边的空格
   * @param {String} target 目标字符串
   */
  trim(target) {
    if (type.isString(target)) {
      return target.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    }
    return target
  },
  /**
   * 序列号：Json to form
   * @param {Object} target 目标对象
   * @param {String} key 不需要传递
   */
  jsonToForm(target, key) {
    if (type.isNotObjectOrArray(target)) { return {} }
    const getKey = (_key) => {
      return this.isEmpty(key) ? _key : `${key}[${_key}]`
    }
    let result = {}
    for (const _key in target) {
      const value = target[_key]
      if (this.isEmpty(value)) { continue }
      if (type.isFunction(value)) { continue }
      if (type.isObjectOrArray(value)) {
        result = Object.assign(result, this.jsonToForm(value, getKey(_key)))
        continue
      }
      // value 非 Object or Array
      result[getKey(_key)] = value
    }
    return result
  },
  arrayRemove(target, condition) {
    if (type.isNotArray(target)) { return Promise.reject('target is not Array') }

    if (type.isNumber(condition)) {
      if (condition < 0 || condition > target.length) { return Promise.reject('not exist') }

      return Promise.try(target.splice(condition, 1))
    }

    if (type.isFunction(condition)) {
      const index = target.findIndex(condition)
      return index === -1 ? Promise.reject('not exist') : Promise.resolve(target.splice(index, 1))
    }
  },
  /**
   * 
   * @param {Array | Object} target 清空目标内容
   */
  clearEmpty(target) {
    if (type.isArray(target)) {
      target.splice(0, target.length)
    }

    if (type.isObject(target)) {
      for (const key of Object.keys(target)) {
        delete target[key]
      }
    }
  },
  /**
   * 计算函数执行时间：默认秒
   * @param {String} param.classify 获取类别
   * @param {Function} param.callback 执行的回调函数
   */
  expendTime({ classify = "second", callback } = {}) {
    const classifys = ['hour', 'minute', 'second']
    if (classifys.includes(classify) === false) {
      classify = 'second'
    }
    if (type.isNotFunction(callback)) { return 0 }
    const begin = new Date().getTime()
    try {
      callback.call(this)
    } catch (error) {
      console.error(error)
    }
    const end = new Date().getTime()
    let difference = end - begin
    if (classify === 'second') {
      difference = Math.ceil(difference / 1000)
    }

    if (classify === 'minute') {
      difference = Math.ceil(difference / 60)
    }

    if (classify === 'hour') {
      difference = Math.ceil(difference / 60)
    }
    return difference
  },
  /**
   * 
   * @param {Object | Array} target 
   * @param {Boolean} param.deep 是否深度克隆, 默认：false
   * @param {Array} param.exclude 是否深度克隆, 默认：false
   */
  clone(target, { deep = false, exclude = [] } = {}) {
    if (type.isNotObjectOrArray(target)) { return target }
    if (deep === true) {
      return JSON.parse(JSON.stringify(target))
    }
    if (type.isObject(target)) {
      const newTarget = { ...target }
      // 排除掉不用的属性
      for (const key of exclude) { delete newTarget[key] }
      // 排除掉不用的属性
      return newTarget
    }
    return target.flatMap(item => this.clone(item))
  },
  /**
   * 获取 Url 参数
   * @param {String} key 参数名
   */
  urlParam(key) {
    const search = window.location.search
    const result = search.replace('?', '').replace(/&/g, ',').replace(/(\w+)=?(\w+|)/ig, '"$1":"$2"')
    const params = JSON.parse(`{${result}}`)
    return this.isEmpty(key) ? params : params[key]
  }
}
