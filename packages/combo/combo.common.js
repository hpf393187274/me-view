const alignEnum = [ 'left', 'center', 'right' ]
const slideEnum = [ 'up', 'down' ]
export default {
  props: {
    data: { type: Array, default () { return [] } },
    highlight: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    checkbox: Boolean,
    width: String,
    defaultValue: String,
    defaultIndex: Number,
    height: [ String, Number ],
    index: Number,
    border: Boolean,
    placeholder: String,
    multiple: Boolean,
    flex: Boolean,
    slideDirection: { type: String, default: 'up', validator: value => slideEnum.includes(value) },
    alignContent: { type: String, default: 'left', validator: value => alignEnum.includes(value) },
    fieldLabel: { type: String, default: 'label' },
    fieldValue: { type: String, default: 'value' },
    value: { type: [ Number, String, Array ] }
  },
  data () {
    return {
      value__: undefined,
      label__: undefined
    }
  }
}
