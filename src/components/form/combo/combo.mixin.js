export default {
  props: {
    data: { type: Array, default() { return [] } },
    highlight: Boolean,
    fieldValue: { type: String, default: 'value' },
    readonly: Boolean,
    fieldLabel: { type: String, default: 'label' },
    value: { type: [String, Array] }
  },
  data() {
    return {
      value__: '',
      label__: ''
    }
  }
}