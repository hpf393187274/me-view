import { tools } from '@assets/script/common'
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
  boolean(value) { return tools.isNotEmpty(value) }
}
