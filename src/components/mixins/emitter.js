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
    dispatch(componentName, eventName, params) {
      let parent = this.findParentComponent([componentName])
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};