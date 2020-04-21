import IconList from './IconList'
const components = [IconList]
export default {
  install (Vue) {
    for (const item of components) {
      Vue.component(item.name, item)
    }
  }
}
