import emitter from 'me-view/src/mixins/emitter'
import Model from 'me-view/src/mixins/model-boolean'
export default {
  mixins: [ emitter, Model ],
  props: {
    index: Number,
    checkbox: Boolean,
    disabled: Boolean,
    highlight: Boolean,
    multiple: Boolean,
    data: { type: Object, default () { return {} } },
    fieldValue: { type: String, default: 'value' },
    fieldLabel: { type: String, default: 'label' }
  },
  computed: {
    uniqueValue () {
      return Reflect.get(this.data, this.fieldValue) || this.index
    },
    isSelected () {
      return [
        { 'is-selected': this.selected }
      ]
    },
    selected () {
      if (this.multiple === true) { return false }
      return this.highlight === true && this.valueInner
    }
  },
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
    },
    handleClick () {
      if (this.disabled === true) { return }
      this.handlerCheckedChange(!this.valueInner)
      this.handleSelector && this.handleSelector(this.valueInner)
      this.dispatchParent('click', { data: this.data, index: this.index })
    }
  }
}
