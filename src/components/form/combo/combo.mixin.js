export default {
  model: {
    props: 'value', event: 'change'
  },
  props: {
    data: { type: Array, default() { return [] } },
    highlight: Boolean,
    readonly: Boolean,
    placeholder: String,
    fieldLabel: { type: String, default: 'label' },
    fieldValue: { type: String, default: 'value' },
    value: { type: [String, Array] }
  },
  data() {
    return {
      value__: '',
      label__: ''
    }
  }
}