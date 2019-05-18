export default {
  watch: {
    checked(newValue) {
      this.checkedChildren = newValue
      this.setAllChecked(newValue)
    }
  },
  methods: {
    isAllChecked() {
      return this.allChecked
    },
    isHalfChecked() {
      return this.halfChecked
    },
    notChecked() {
      return this.allChecked === false
    },
    isHazyChecked() {
      return this.allChecked || this.halfChecked
    },
    notHazyChecked() {
      return this.isHazyChecked() === false
    },
    /**
     * 点击 Checkbox
     * @param {Booelan} value 变更后的Checkbox 状态
     */
    clickCheckbox(value) {
      this.setAllChecked(value)
      this.setAllCheckedNumber(value ? this.nodeNumber : 0)
      this.$emit('alter-parent')
      this.alterChildrenNodeChecked(value)
    },
    /**
     * 变更子节点状态
     * @param {Boolean} value 状态
     */
    alterChildrenNodeChecked(value) {
      this.$nextTick(function () {
        for (const node of this.getNodeList()) {
          node.setAllChecked(value)
          node.setAllCheckedNumber(value ? node.getChildrenNodeNumber() : 0)
          node.alterChildrenNodeChecked(value)
        }
      })
    }
  }
}
