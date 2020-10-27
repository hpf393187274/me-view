export default {
  props: {
    value: Boolean,
    center: Boolean,
    modal: { type: Boolean, default: true },
    classContainer: String,
    top: { type: String, default: null },
    left: { type: String, default: null },
    closableModal: Boolean,
    moveable: Boolean
  },
  data () {
    return {
      visible: this.value
    }
  },
  watch: {
    value (newValue) {
      this.visible = newValue
    },
    visible (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    handlerCancel () {
      this.visible = false
      this.$emit('cancel')
    }
  }
}
