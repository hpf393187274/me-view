
import Type from 'me-view/src/script/type'
const layouts = [ 'center', 'start', 'end' ]
export default {
  props: {
    editable: Boolean,
    sortable: Boolean,
    resizable: Boolean, /** 可调整的 */
    width: [ Number, String ],
    layout: { type: String, default: 'start', validator: value => layouts.includes(value) },
    label: String,
    index: Number,
    field: String,
    type: {
      type: String, default: ''
    },
    formatter: Function, /** 格式化 */
    render: Function,
    extended: Function
  },
  data () {
    return {
      index__: 1,
      width__: this.width
    }
  },
  watch: {
    width__ (newValue) {
      this.$emit('update:width', newValue)
    },
    width (newValue) {
      this.width__ = newValue
    }
  },
  computed: {
    styles () {
      return {
        width: Type.isNumber(this.width) ? `${this.width}px` : this.width
      }
    }
  }
}
