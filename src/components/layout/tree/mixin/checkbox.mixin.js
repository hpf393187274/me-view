export default {
  data() {
    return {
      checked__: this.checked || this.data.checked === true,
      checkedNumber: 0,
      indeterminateNumber: 0
    }
  },
  watch: {
    checked(newValue) {
      this.checked__ = newValue
      this.alterChildrenNodeChecked(newValue)
    },
    checked__(newValue) {
      if (this.level > 1) {
        this.$emit('alter-checked-number', newValue ? 1 : -1)
      }
    },
    indeterminate(newValue) {
      if (this.level > 1) {
        this.$emit('alter-indeterminate-number', newValue ? 1 : -1)
      }
    },
    checkedNumber(newValue) {
      this.checked__ = newValue === this.nodeNumber
    }
  },
  computed: {
    indeterminate() {
      if (this.indeterminateNumber > 0) {
        return true
      }
      return this.checkedNumber > 0 && this.checkedNumber < this.nodeNumber
    }
  },
  methods: {
    isChecked() {
      return this.checked__
    },
    notChecked() {
      return this.checked__ === false
    },
    isIndeterminate() {
      return this.indeterminate
    },
    notIndeterminate() {
      return this.indeterminate === false
    },
    isViewChecked() {
      return this.checked__ || this.indeterminate
    },
    notViewChecked() {
      return this.isViewChecked() === false
    },
    setChecked(value, deep = false) {
      this.checked__ = value
      deep && this.alterChildrenNodeChecked(value)
    },
    /**
     * 变更子节点全选的个数
     * @param {Number} value 1 or -1
     */
    alterCheckedNumber(value) {
      this.checkedNumber += value
    },
    /**
     * 变更子节点半选的个数
     * @param {Number} value 1 or -1
     */
    alterIndeterminateNumber(value) {
      this.indeterminateNumber += value
    },
    /**
     * 点击 Checkbox
     * @param {Booelan} value 变更后的Checkbox 状态
     */
    clickCheckbox(value) {
      this.checked__ = value
      this.alterChildrenNodeChecked(value)
    },
    /**
     * 变更子节点状态
     * @param {Boolean} value 状态
     */
    alterChildrenNodeChecked(value) {
      new Promise((resolve, reject) => {
        try {
          for (const node of this.getNodeList()) {
            node.setChecked(value)
            node.alterChildrenNodeChecked(value)
          }
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
