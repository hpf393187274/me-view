import { type } from '@assets/script/common'
const adapterComponent = path => {
  return item => {
    if (type.isObject(item)) {
      return { ...item, path: `${path}/${item.path}` }
    } else {
      return { name: item, path: `${path}/${item}.vue` }
    }
  }
}
export { adapterComponent }  