import type from './type.common'
export default {
  /**
   * 校验：对象是否为空
   * @param {Object} target 目标
   */
  isEmpty (target) {
    if (target === null || target === undefined) { return true }
    if (type.isString(target)) {
      const value = this.trim(target)
      return value === '' || value === 'null' || value === 'undefined'
    }

    if (type.isArray(target) && target.length === 0) { return true }
    if (type.isObject(target) && Object.keys(target).length === 0) { return true }

    return false
  },
  /**
   * 是空数组
   * @param {Array} target
   */
  isEmptyArray (target) {
    if (type.isArray(target) && target.length === 0) { return true }
    return false
  },

  /**
   * 校验：对象是否为空
   * @param {Object} target 目标
   */
  isNotEmpty (target) {
    return !this.isEmpty(target)
  },
  /**
   * 转换为 Number
   * @param {*} target
   */
  convertToNumber (target) {
    if (target) {
      if (type.isNumber(target)) { return target }
      if (type.isString(target)) {
        const result = target.replace(/[^\d]+/, '')
        if (this.isNotEmpty(result)) {
          return Number(result)
        }
      }
      throw new Error('convert to number error, target；' + target)
    }
    return target
  },
  /**
   * 去除字符串两边的空格
   * @param {String} target 目标字符串
   */
  trim (target) {
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
  jsonToForm (target, key) {
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
  /**
   * 生成 UUID
   */
  UUId () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s.push(hexDigits.substr(Math.floor(Math.random() * 0x10), 1))
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
  },
  /**
   * 数组元素移出
   * @param {Array} target
   * @param {Function or Number} condition
   */
  arrayRemove (target, condition) {
    if (type.isNotArray(target)) { return Promise.reject(new Error('target is not Array')) }

    if (type.isNumber(condition)) {
      if (condition < 0 || condition > target.length) { return Promise.reject(new Error('index 下标越界')) }

      return Promise.resolve(target.splice(condition, 1))
    }

    if (type.isFunction(condition)) {
      const index = target.findIndex(condition)
      return index === -1 ? Promise.reject(new Error('not exist')) : Promise.resolve(target.splice(index, 1))
    }
  },
  /**
   *
   * @param {Array | Object} target 清空目标内容
   */
  clearEmpty (target) {
    if (type.isArray(target)) {
      target.splice(0, target.length)
    }

    if (type.isObject(target)) {
      for (const key of Object.keys(target)) {
        Reflect.deleteProperty(target, key)
      }
    }
  },
  /**
   * 迭代
   * @param {Array|Object} target 目标
   * @param {Function} callback 回调函数
   */
  forEach (target, callback) {
    if (type.isArray(target) && target.length > 0 && type.isFunction(callback)) {
      for (const item of target) { callback(item) }
    }

    if (type.isObject(target) && type.isFunction(callback)) {
      for (const key in target) { callback(key, target[key]) }
    }
  },
  /**
   * 是否存在于数组
   * then 存在
   * catch 不存在
   * params.status true 异常
   * @param {Array} source
   * @param {Object} target
   * @param {Function} callback
   */
  includes (source, target, callback) {
    if (type.isNotArray(source)) {
      return Promise.reject(new Error('source is not Array'))
    }
    if (this.isEmpty(target)) {
      return Promise.reject(new Error('target is Empty'))
    }
    if (type.isNotFunction(callback)) {
      callback = (source, target) => source === target
    }
    const index = source.findIndex(item => callback(item, target))
    if (index === -1) {
      return Promise.resolve({ status: false, data: target })
    } else {
      return Promise.resolve({ status: true, data: source[index], index })
    }
  },
  /**
   * 计算函数执行时间：默认秒
   * @param {String} param.classify 获取类别
   * @param {Function} param.callback 执行的回调函数
   */
  expendTime ({ classify = 'second', callback } = {}) {
    const classifyList = ['hour', 'minute', 'second']
    if (classifyList.includes(classify) === false) {
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
  clone (target, { deep = false, exclude = [] } = {}) {
    if (type.isNotObjectOrArray(target)) { return target }
    if (deep === true) {
      return JSON.parse(JSON.stringify(target))
    }
    if (type.isObject(target)) {
      const newTarget = { ...target }
      // 排除掉不用的属性
      for (const key of exclude) { Reflect.deleteProperty(newTarget, key) }
      // 排除掉不用的属性
      return newTarget
    }
    return target.flatMap(item => this.clone(item))
  },
  sendRedirect (url) {
    window.location.href = url
  },
  /**
   * 如果存在 iframe
   */
  isSameHost () {
    return window.top.location.host === window.location.host
  },
  /**
  * 获取 Url 参数
  * @param {String} key 参数名
  */
  urlParam (key, target = window.location.search) {
    let result = target.replace(/^([^s]*)[?]/g, '').replace(/&/g, ',')
    const params = JSON.parse(result.replace(/([\w.\d\\-]+)=?([\w.\d\\-]+|)/ig, '{"$1":"$2"}'))
    return this.isEmpty(key) ? params : Reflect.get(params, key)
  },
  /**
   * 首字母变大写
   * @param {String} target
   */
  firstCharUpperCase (target) {
    if (this.isEmpty(target)) { return '' }
    return target.slice(0, 1).toUpperCase() + target.slice(1)
  },
  /**
   * 首字母变小写
   * @param {String} target
   */
  firstCharLowerCase (target) {
    if (this.isEmpty(target)) { return '' }
    return target.slice(0, 1).toLowerCase() + target.slice(1)
  }
}
