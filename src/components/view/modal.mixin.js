export default {
  props: {
    value: Boolean,
    center: Boolean,
    height: { type: String, default: '300px' },
    width: { type: String, default: '300px' },
    closableModal: { type: Boolean, default: true },
    draggable: Boolean,
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
  methods: {
    onCancel() {
      this.value__ = false
      this.$emit('cancel')
    }
  }
}