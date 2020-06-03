export default {
  props: {
    data: { type: Array, default () { return [] } },
    highlight: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    checkbox: Boolean,
    width: String,
    height: [ String, Number ],
    index: Number,
    border: Boolean,
    placeholder: String,
    multiple: Boolean,
    flex: Boolean,
    fieldLabel: { type: String, default: 'label' },
    fieldValue: { type: String, default: 'value' },
    value: { type: [ String, Array ] }
  },
  data () {
    return {
      value__: undefined,
      label__: undefined
    }
  }
}
