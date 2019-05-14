export default {
  data() {
    return {
      checked__: this.checked || this.data.checked === true,
      indeterminate: false,
      checkedNumber: 0,
      indeterminateNumber: 0
    }
  },
  watch: {
    checked(newValue) {
      this.checked__ = newValue
      this.modifyChildren(newValue)
    },
    checked__(newValue) {
      if (this.level > 1) {
        this.$emit('alter-checked-number', newValue ? 1 : -1)
      }
    },
    indeterminate(newValue) {
      // this.$refs.checkbox.indeterminate = newValue
      if (this.level > 1) {
        this.$emit('alter-indeterminate-number', newValue ? 1 : -1)
      }
    },
    checkedNumber(newValue) {
      this.checked__ = newValue === this.nodeNumber
      this.indeterminate = this.parseIndetermminate()
    },
    indeterminateNumber() {
      this.indeterminate = this.parseIndetermminate()
    }
  },
  methods: {
    parseIndetermminate() {
      if (this.indeterminateNumber > 0) {
        return true
      }
      return this.checkedNumber > 0 && this.checkedNumber < this.nodeNumber
    },
    alterCheckedNumber(value) {
      this.checkedNumber += value
    },
    alterIndeterminateNumber(value) {
      this.indeterminateNumber += value
    },
    clickCheckbox(value) {
      this.checked__ = value
      this.modifyChildren(value)
    },
    modifyChildren(value) {
      for (const node of this.getNodeList()) {
        node.$data.checked__ = value
        node.modifyChildren(value)
      }
    }
  }
}
