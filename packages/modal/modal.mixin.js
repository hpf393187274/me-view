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
  data () {
    return {
      visibility: this.value
    }
  },
  watch: {
    value (newValue) {
      this.visibility = newValue
    },
    visibility (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    handlerCancel () {
      this.visibility = false
      this.$emit('cancel')
    }
  }
}
