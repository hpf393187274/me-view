export default {
  props: {
    data: { type: Array, default() { return [] } },
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