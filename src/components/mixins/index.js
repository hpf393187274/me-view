
import props from './props'
import data from './data'
import methods from './methods'

import computed from './computed'

import filters from './filters'
export default {
  props,
  data() { return data },
  created() {
    this.primaryKey__ = this.$tools.isEmpty(this.primaryKey) ? this.$tools.UUId() : this.primaryKey
  },
  watch: {
    primaryKey(newValue) {
      this.primaryKey__ = newValue
    }
  },
  methods,
  filters,
  computed
}
