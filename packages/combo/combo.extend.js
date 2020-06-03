export default {
  watch: {
    value (value) { this.value__ = value }
  },
  created () {
    this.value__ = this.value
  },
  methods: {
    handlerClick ({ data, index }) {
      this.$refs.combo.$emit('me-combo--select', data, index)
    }
  }
}
