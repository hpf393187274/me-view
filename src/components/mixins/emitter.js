function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    existParentComponent(componentNames) {
      const parent = this.findParentComponent(componentNames)
      return this.$tools.isNotEmpty(parent)
    },
    findParentComponent(componentNames) {
      if (this.$tools.isEmptyArray(componentNames)) {
        console.error(`组件(${this.$options.name}) 调用方法 findParentComponent 入参  is no array or empty array`)
        return null
      }
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || componentNames.includes(name) === false)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      return parent
    },
    findParentComponent(componentNames) {
      if (this.$tools.isEmptyArray(componentNames)) {
        console.error(`组件(${this.$options.name}) 调用方法 findParentComponent 入参  is no array or empty array`)
        return null
      }
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || componentNames.includes(name) === false)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      return parent
    },
    dispatchParent(componentName, eventName, params) {
      let parent = this.findParentComponent([componentName])
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    isComponentVue(target) {
      if (!target) { return false }
      if (!target.$options) { return false }
      if (!target.$options.name) { return false }
      return true
    },
    listener(targetComponent, eventName, callback = () => { }) {
      if (this.isComponentVue(targetComponent) === false) {
        console.warn('当前目标需要一个 vue Component')
        return
      }

      // const name = targetComponent.$options && ? targetComponent.$options.name;
      if (parent) {
        parent.$off.call(parent, eventName, callback);
        parent.$on.call(parent, eventName, callback);

      }
    },
    listenerUpward(componentName, eventName, callback) {
      let parent = this.findParentComponent([componentName])
      if (parent) {
        parent.$off.call(parent, eventName, callback);
        parent.$on.call(parent, eventName, callback);
      }
    },

    listenerParent(eventName, callback = () => { }) {
      let parent = this.$parent || this.$root;
      if (parent) {
        parent.$off.call(parent, eventName, callback);
        parent.$on.call(parent, eventName, callback);
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};