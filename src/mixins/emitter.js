import tools from 'me-view/src/script/Tools.class'
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
      return tools.notEmpty(parent)
    },
    findChildrenComponent (componentName, callback = () => { }) {
      findChildren.call(this, componentName, callback)
    },
    findParentComponent (componentNames) {
      if (tools.isEmptyArray(componentNames)) {
        throw new CustomEvent(`组件(${this.$options.name}) 调用方法 findParentComponent 入参  is no array or empty array`)
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
    listenerUpward (componentName, eventName, callback) {
      const parent = this.findParentComponent([ componentName ])
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
