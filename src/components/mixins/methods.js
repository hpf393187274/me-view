import { tools, type } from '@assets/script/common'

function findChildren (componentName, callback = () => { }) {
  const children = this.$children
  if (!children || children.length === 0) { return }
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      try {
        callback && callback(child)
      } catch (error) {
        console.error(`组件 ${name} 执行 callback error, message：${error}`)
      }
    } else {
      findChildren.call(child, componentName, callback)
    }
  })
}
export default {
  /**
   *
   * @param {String} value
   */
  preImg (value) {
    return `/images/${value}`
  },
  /**
   *
   * @param {String} value
   */
  boolean (value) { return tools.isNotEmpty(value) },

  initPrimaryKey (data) {
    if (type.isArray(data)) {
      data.forEach(item => {
        if (Reflect.has(item, 'primaryKey') === false) {
          Reflect.set(item, 'primaryKey', tools.UUId())
        }
      })
    }

    if (type.isObject(data)) {
      if (Reflect.has(data, 'primaryKey') === false) {
        Reflect.set(data, 'primaryKey', this.primaryKey__)
      }
    }
  },
  existParentComponent (componentNames) {
    const parent = this.findParentComponent(componentNames)
    return this.$tools.isNotEmpty(parent)
  },
  findChildrenComponent (componentName, callback = () => { }) {
    findChildren.call(this, componentName, callback)
  },
  findParentComponent (componentNames) {
    if (this.$tools.isEmptyArray(componentNames)) {
      console.error(`组件(${this.$options.name}) 调用方法 findParentComponent 入参  is no array or empty array`)
      return null
    }
    let parent = this.$parent || this.$root
    let name = parent.$options.name

    while (parent && (!name || componentNames.includes(name) === false)) {
      parent = parent.$parent

      if (parent) {
        name = parent.$options.name
      }
    }
    return parent
  },
  dispatchParent (componentName, eventName, params) {
    let parent = this.findParentComponent([componentName])
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  },
  isComponentVue (target) {
    if (!target) { return false }
    if (!target.$options) { return false }
    if (!target.$options.name) { return false }
    return true
  },
  listenerUpward (componentName, eventName, callback) {
    let parent = this.findParentComponent([componentName])
    if (parent) {
      this.$off.call(parent, eventName, callback)
      this.$on.call(parent, eventName, callback)
    }
  },
  listenerParent (eventName, callback = () => { }) {
    let parent = this.$parent || this.$root
    if (parent) {
      this.$off.call(parent, eventName, callback)
      this.$on.call(parent, eventName, callback)
    }
  }
}
