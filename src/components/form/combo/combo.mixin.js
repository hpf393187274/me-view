export default {
  model: {
    props: 'value', event: 'change'
  },
  props: {
    data: { type: Array, default() { return [] } },
    highlight: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    checkbox: Boolean,
    height: [String, Number],
    border: Boolean,
    placeholder: String,
    multiple: Boolean,
    fieldLabel: { type: String, default: 'label' },
    fieldValue: { type: String, default: 'value' },
    value: { type: [String, Array, Object] }
  },
  data() {
    return {
      value__: this.multiple ? [] : '',
      label__: this.multiple ? [] : ''
    }
  }
}