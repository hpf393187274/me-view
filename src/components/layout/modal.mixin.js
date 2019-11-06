export default {
  props: {
    value: Boolean,
    center: Boolean,
    height: { type: String, default: '300px' },
    width: { type: String, default: '300px' },
    moveable: Boolean
  },
  data() {
    return {
      value__: this.value
    }
  },
  watch: {
    value(newValue) {
      this.value__ = newValue
    },
    value__(newValue) {
      this.$emit('input', newValue)
    }
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  methods: {
    onCancel() {
      this.value__ = false
      this.$emit('cancel')
    }
  }
}