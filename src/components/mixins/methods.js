import { tools } from '@assets/script/common'
export default {
  preImg(value) {
    return `/images/${value}`
  },
  boolean(value) { return tools.isNotEmpty(value) }
}
