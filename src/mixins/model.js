export default {
  data () { return { valueInner: this.value } },
  watch: {
    valueInner (value) { this.$emit('input', value) },
    value (value) { this.valueInner = value }
  }
}
