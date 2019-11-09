export default {
  props: {
    value: Boolean,
    center: Boolean,
    modal: { type: Boolean, default: true },
    classContainer: String,
    top: { type: String, default: null },
    left: { type: String, default: null },
    closableModal: { type: Boolean, default: true },
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