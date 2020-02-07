
import methods from './methods'

import computed from './computed'

import filters from './filters'
export default {
  created () {
    this.primaryKey__ = this.$tools.isEmpty(this.primaryKey) ? this.$tools.UUId() : this.primaryKey
  },
  watch: {
    primaryKey (newValue) {
      this.primaryKey__ = newValue
    }
  },
  methods,
  filters,
  computed
}
