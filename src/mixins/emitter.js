import Tools from 'me-view/src/script/tools'
import Assert from 'me-view/src/script/assert'
function findChildren (componentName, callback = () => { }) {
  const children = this.$children
  if (!children || children.length === 0) { return }
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      try {
        callback && callback(child)
      } catch (error) {
        console.debug(`组件 ${name} 执行 callback error, message：${error}`)
      }
    } else {
      findChildren.call(child, componentName, callback)
    }
  })
}

export default {
  methods: {
    existParentComponent (componentNames) {
      const parent = this.findParentComponent(componentNames)
      return Tools.notEmpty(parent)
    },
    findChildrenComponent (componentName, callback = () => { }) {
      findChildren.call(this, componentName, callback)
    },
    findParentComponent (componentNames) {
      Assert.isArray(componentNames, '必须是一个数组')
      let name = this.$options.name
      if (componentNames.includes(name)) { return this }
      let parent = this.$parent || this.$root
      name = parent.$options.name

      while (parent && (!name || componentNames.includes(name) === false)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      return parent
    },
    dispatch (eventName, params) {
      this.$emit(eventName, params)
    },
    dispatchParent (eventName, params) {
      const parent = this.$parent || this.$root
      if (parent) {
        this.$emit.apply(parent, [ eventName ].concat(params))
      }
    },
    dispatchUpward (componentName, eventName, params) {
      const parent = this.findParentComponent([ componentName ])
      if (parent) {
        this.$emit.apply(parent, [ eventName ].concat(params))
      }
    },
    listenerUpward (componentNames, eventName, callback) {
      const parent = this.findParentComponent([ ...[ componentNames ].flat() ])
      if (parent) {
        this.$off.apply(parent, [ eventName, callback ])
        this.$on.apply(parent, [ eventName, callback ])
      }
    },
    listener (eventName, callback) {
      this.$off(eventName, callback)
      this.$on(eventName, callback)
    },
    listenerParent (eventName, callback = () => { }) {
      const parent = this.$parent || this.$root
      if (parent) {
        this.$off.apply(parent, [ eventName, callback ])
        this.$on.apply(parent, [ eventName, callback ])
      }
    }
  }
}
