
export default {
  props: {
    editable: Boolean,
    sortable: Boolean,
    resizable: Boolean, /** 可调整的 */
    width: [Number, String],
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
  data() {
    return {
      index__: 1,
      width__: this.width
    }
  },
  watch: {
    width__(newValue) {
      this.$emit('update:width', newValue)
    },
    width(newValue) {
      this.width__ = newValue
    }
  },
  computed: {
    styles() {
      return {
        'width': this.$type.isNumber(this.width) ? `${this.width}px` : this.width
      }
    }
  }
}
