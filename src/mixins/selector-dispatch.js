import emitter from 'me-view/src/mixins/emitter'
import Model from 'me-view/src/mixins/model-boolean'
export default {
  mixins: [ emitter, Model ],
  created () {
    this.dispatchUpward(this.containerName, 'element-children--created', { key: this.uniqueValue, value: this })
  },
  beforeDestroy () {
    this.dispatchUpward(this.containerName, 'element-children--beforeDestroy', { key: this.uniqueValue, value: this })
  },
  methods: {
    handlerCheckedChange (value) {
      this.valueInner = value
    },
    handleSelector (value) {
      if (this.multiple === true) {
        this.dispatchUpward(this.containerName, `element-selector--multiple-${value}`, { key: this.uniqueValue, value: this })
      } else {
        this.dispatchUpward(this.containerName, 'element-selector--single', { key: this.uniqueValue, value: this })
      }
    }
  }
}
