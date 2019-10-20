import { tools, type } from '@assets/script/common'
export default {
  /**
   * 
   * @param {String} value 
   */
  preImg(value) {
    return `/images/${value}`
  },
  /**
   * 
   * @param {String} value 
   */
  boolean(value) { return tools.isNotEmpty(value) },

  initPrimaryKey(data) {
    if (type.isArray(data)) {
      data.forEach(item => {
        if (Reflect.has(item, 'primaryKey') === false) {
          Reflect.set(item, 'primaryKey', tools.UUId())
        }
      })
    }

    if (type.isObject(data)) {
      if (Reflect.has(Object, 'primaryKey') === false) {
        Reflect.set(data, 'primaryKey', tools.UUId())
      }
    }
  }
}
