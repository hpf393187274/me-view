export default {
  data() {
    return {
      checked__: this.checked || this.data.checked === true,
      allCheckedNumber: 0,
      halfCheckedNumber: 0
    }
  },
  watch: {
    checked(newValue) {
      this.checked__ = newValue
      this.alterChildrenNodeChecked(newValue)
    },
    checked__(newValue) {
      if (this.level > 1) {
        this.$emit('alter-all-checked-number', newValue ? 1 : -1)
      }
    },
    halfChecked(newValue) {
      if (this.level > 1) {
        this.$emit('alter-half-checked-Number', newValue ? 1 : -1)
      }
    },
    allCheckedNumber(newValue) {
      this.checked__ = newValue === this.nodeNumber
    }
  },
  computed: {
    halfChecked() {
      if (this.halfCheckedNumber > 0) {
        return true
      }
      return this.allCheckedNumber > 0 && this.allCheckedNumber < this.nodeNumber
    }
  },
  methods: {
    isChecked() {
      return this.checked__
    },
    notChecked() {
      return this.checked__ === false
    },
    isHazyChecked() {
      return this.checked__ || this.halfChecked
    },
    notHazyChecked() {
      return this.isHazyChecked() === false
    },
    setChecked(value, deep = false) {
      this.checked__ = value
      deep && this.alterChildrenNodeChecked(value)
    },
    /**
     * 变更子节点全选的个数
     * @param {Number} value 1 or -1
     */
    alterAllCheckedNumber(value) {
      this.allCheckedNumber += value
    },
    /**
     * 变更子节点半选的个数
     * @param {Number} value 1 or -1
     */
    alterHalfCheckedNumber(value) {
      this.halfCheckedNumber += value
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
