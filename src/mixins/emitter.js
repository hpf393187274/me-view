import Tools from 'me-view/src/script/tools'
import Assert from 'me-view/src/script/assert'

function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit.apply(child, [ eventName ].concat(params))
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [ componentName, eventName ].concat([ params ]))
    }
  })
}

export default {
  methods: {
    existParentComponent (componentNames) {
      const parent = this.findParentComponent(componentNames)
      return Tools.notEmpty(parent)
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
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
