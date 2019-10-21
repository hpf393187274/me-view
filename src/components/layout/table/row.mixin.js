export default {
  props: {
    columns: { type: Array, default: () => [] }
  },
  computed: {
    classColumn() {
      return [
        'me-row table-column',
        {
          'me-flex': this.columns.findIndex(item => this.$tools.isNotEmpty(item.width)) === -1,
          'me-center': this.center
        }
      ]
    }
  },
  watch: {
    checked(value) { this.checked__ = value }
  },
  data() {
    return {
      checked__: this.checked
    }
  }
}