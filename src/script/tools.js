import Type from './type'
import Assert from './assert'
import Qs from 'qs'
import Validator from 'async-validator'
export default class Tools {
  static ASC = 'ASC'
  static DESC = 'DESC'
  /**
   * 校验：对象是否为空
   * @param {Object} target 目标
   */
  static isEmpty (target) {
    return target === null || target === undefined
  }

  /**
   * 校验：是否为空值
   * @param {Object} target 目标
   */
  static isBlank (target) {
    if (Tools.isEmpty(target)) { return true }
    if (Type.isString(target)) {
      const value = Tools.trim(target)
      return value === '' || value === 'null' || value === 'undefined'
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
   * 校验：不是空值
   * @param {Object} target 目标
   */
  static notBlank (target) {
    return Tools.isBlank(target) === false
  }

  /**
   * 校验：对象是否为空
   * @param {Object} target 目标
   */
  static notEmpty (target) {
    return Tools.isEmpty(target) === false
  }

  /**
   * 转换为 Number
   * @param {*} target
   */
  static convertToNumber (target) {
    if (target) {
      if (Type.isNumber(target)) { return target }
      if (Type.isString(target)) {
        const result = target.replace(/[^\d]+/, '')
        if (Tools.notEmpty(result)) {
          return Number(result)
        }
      }
      throw new Error('convert to number error, target；' + target)
    }
    return target
  }

  /**
   * 排序集合
   * @param {Array} target集合
   * @param {Function} callback 排序回调
   * @param {String} order 排序方式：ASC 升序，DESC 降序
   */
  static sort (target, callback = item => item, order = Tools.ASC) {
    if (Type.notArray(target) || target.length === 0) { return }
    target.sort((a, b) => {
      const valueA = callback && callback(a)
      const valueB = callback && callback(b)
      return order === Tools.ASC ? valueA - valueB : valueB - valueA
    })
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

  static findPath (target, path) {
    Assert.isObject(target, 'target is not Object')
    Assert.isString(path, 'path is not String')
    if (path.includes('.') === false) {
      return Reflect.get(target, path)
    }
    const props = path.split('.')
    let tempObject = { ...target }
    for (const prop of props) {
      if (Tools.isEmpty(prop) || Type.notObject(tempObject) || Reflect.has(tempObject, prop) === false) {
        return undefined
      }
      tempObject = Reflect.get(tempObject, prop)
    }
    return tempObject
  }

  /**
   * 生成 UUID
   */
  static UUId () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s.push(hexDigits.substr(Math.floor(Math.random() * 0x10), 1))
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
  }

  /**
   * 数组元素移出
   * @param {Array} target
   * @param {Function or Number} condition
   */
  static arrayRemove (target, condition) {
    if (Type.isArray(target)) {
      if (Type.isNumber(condition)) {
        target.splice(condition, 1)
        return condition
      }
      if (Type.isFunction(condition)) {
        const index = target.findIndex(condition)
        index !== -1 && target.splice(index, 1)
        return index
      }
    }
  }

  /**
   *
   * @param {Array | Object} target 清空目标内容
   */
  static clearEmpty (target) {
    if (Type.isArray(target)) {
      target.splice(0, target.length)
    }

    if (Type.isObject(target)) {
      for (const key of Object.keys(target)) {
        Reflect.deleteProperty(target, key)
      }
    }
  }

  /**
   * 迭代
   * @param {Array|Object} target 目标
   * @param {Function} callback 回调函数
   */
  static forEach (target, callback) {
    if (Type.notFunction(callback)) { return }
    if (Type.isArray(target)) {
      for (const item of target) { callback(item) }
    }

    if (Type.isObject(target)) {
      for (const key in target) { callback(key, target[key]) }
    }
  }

  /**
   * 是否存在于数组
   * then 存在
   * catch 不存在
   * params.status true 异常
   * @param {Array} source
   * @param {Object} target
   * @param {Function} callback
   */
  static includes (target, callback) {
    if (Type.isArray(target) && Type.isFunction(callback)) {
      return target.findIndex(callback) >= 0
    }
    return false
  }

  /**
   * 计算函数执行时间：默认秒
   * @param {Function} callback 执行的回调函数
   * @param {String} classify 获取类别 默认秒 = second, 'hour', 'minute', 'second'
   */
  static expendTime (callback, classify = 'second') {
    const classifyList = [ 'hour', 'minute', 'second' ]
    if (classifyList.includes(classify) === false) {
      classify = 'second'
    }
    if (Type.notFunction(callback)) { return 0 }
    const begin = new Date().getTime()
    try {
      callback.call(Tools)
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
  }

  /**
   * 克隆对象
   * @param {Object} target
   * @param {Boolean} param.deep 是否深度克隆, 默认：false
   * @param {Array} param.exclude 属性排除, deep = true 无效
   */
  static clone (target, { deep = false, exclude = [] } = {}) {
    if (Type.notObject(target)) {
      return target
    }
    if (deep === true) {
      try {
        return JSON.parse(JSON.stringify(target))
      } catch (error) {
        console.error('Tools.clone --> deep = true，target = ', target)
      }
    }
    const newTarget = { ...target }
    // 排除掉不用的属性
    for (const key of exclude) { Reflect.deleteProperty(newTarget, key) }
    // 排除掉不用的属性
    return newTarget
  }

  static sendRedirect (url) {
    window.location.href = url
  }

  /**
   * 如果存在 iframe
   */
  static isSameHost () {
    return top.location.host === window.location.host
  }

  /**
  * 获取 Url 参数
  * @param {String} key 参数名
  * @param {String} search 参数集
  */
  static urlParam (key, search = location.search) {
    if (Tools.isEmpty(search)) { return '' }
    let result = search.replace(/^([^s]*)[?]/g, '').replace(/&/g, ',')
    try {
      result = result.replace(/([\w.\d\\-]+)=?([\w.\d\\-]+|)/ig, '"$1":"$2"')
      const params = JSON.parse(`{${result}}`)
      return Tools.isEmpty(key) ? params : Reflect.get(params, key)
    } catch (error) {
      console.debug('Tools.urlParam error：', error)
      return ''
    }
  }

  /**
   * URl 格式化
   * @param {String} url 地址
   */
  static urlFormat (url) {
    Assert.notEmpty(url, '参数 url 不能为空')
    return url.replace(/:\/+/g, '**').replace(/\\+/g, '/').replace(/\/+|\\+/g, '/').replace('**', '://')
  }

  /**
   * URL 绝对化
   * @param {String} url 目标url
   * @param {String} origin 默认当前环境
   */
  static urlAbsolutize (url, origin = location.origin) {
    Assert.notEmpty(url, '参数 url 不能为空')
    if (url.startsWith('http://') === false && url.startsWith('https://') === false) {
      return Tools.urlFormat(`${origin}/${url}`)
    }
    return Tools.urlFormat(url)
  }

  /**
   * 首字母变大写
   * @param {String} target
   */
  static firstCharUpperCase (target) {
    if (Tools.isEmpty(target)) { return '' }
    return target.slice(0, 1).toUpperCase() + target.slice(1)
  }

  /**
   * 首字母变小写
   * @param {String} target
   */
  static firstCharLowerCase (target) {
    if (Tools.isEmpty(target)) { return '' }
    return target.slice(0, 1).toLowerCase() + target.slice(1)
  }

  /**
   * 字符串化
   * 参考：Qs.stringify
   * @param {String} target 目标
   * @param {Object} options 配置
   */
  static stringify (target = '', options = {}) {
    const newOptions = Object.assign({
      encodeValuesOnly: true, arrayFormat: 'repeat', allowDots: true
    }, options || {})
    return Qs.stringify(target, newOptions)
  }

  /**
   * 字符串解析成对象
   * 参考：Qs.parse
   * @param {String} target 目标
   * @param {Object} options 配置
   */
  static parse (target = {}, options = {}) {
    const newOptions = Object.assign({
      charset: 'utf-8'
    }, options || {})
    return Qs.parse(target, newOptions)
  }

  static hasScrollBar (el, direction = 'vertical') {
    Assert.notEmpty(el, 'html 元素不能为空')
    if ([ 'vertical', 'horizontal' ].includes(direction) === false) {
      console.debug('Tools -> direction 不属于 "vertical" or "horizontal", 则默认初始化为："vertical"')
      direction = 'vertical'
    }
    return direction === 'vertical' ? el.scrollHeight > el.clientHeight : el.scrollWidth > el.clientWidth
  }

  static scrollBarWidth (el) {
    if (this.notEmpty(el)) {
      if (this.hasScrollBar(el)) {
        return el.offsetWidth - el.clientWidth
      }
      return el.offsetWidth - el.clientWidth
    }
    el = document.createElement('div')
    Object.assign(el.style, { width: '100px', height: '100px', overflowY: 'scroll' })
    document.body.appendChild(el)
    const bool = this.scrollBarWidth(el)
    el.remove()
    // document.body.removeChild(el)
    return bool
  }

  static async validate (key = this.UUId(), value, rules = []) {
    if (Type.notArray(rules)) { return 'success' }
    const validator = new Validator({ [key]: rules })
    try {
      await validator.validate({ [key]: value }, { firstFields: true })
      return 'success'
    } catch ({ errors }) {
      const [ error ] = errors
      await Promise.reject(error.message)
    }
  }

  static clientHeight () {
    return document.body.clientHeigh
  }
}
