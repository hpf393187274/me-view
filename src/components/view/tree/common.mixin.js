
export default {
  methods: {
    /**
     * 获取子节点选中个数
     * 全选 and 半选
     */
    getCheckedNumber() {
      let checkedNumber = 0
      let checkedHalfNumber = 0
      for (const node of this.getChildrenNodeList()) {
        node.isAllChecked() && checkedNumber++
        node.isHalfChecked() && checkedHalfNumber++
      }
      this.setAllCheckedNumber(checkedNumber)
      this.checkedHalfNumber = checkedHalfNumber
      return { checkedNumber, checkedHalfNumber }
    },
    /**
     * 变更父级
     */
    alterParent() {
      const { checkedNumber, checkedHalfNumber } = this.getCheckedNumber()
      if (this.checkedStrictly) {
        this.allChecked = checkedNumber === this.nodeNumber
        if (checkedHalfNumber > 0) {
          this.checkedHalf = true
        } else {
          this.checkedHalf = checkedNumber > 0 && checkedNumber < this.nodeNumber
        }
      }
      this.$emit('alter-parent')
    },

    getCheckedChildren({ leaf = true, tree = false, ...param } = {}) {
      const childrenList = []
      for (const node of this.getChildrenNodeList()) {
        if (node.notHazyChecked()) { continue }
        if (tree === false) {
          childrenList.push(...node.getCheckedData({ leaf, tree, ...param }))
          continue
        }

        if (leaf === false && node.isLeaf()) { continue }
        childrenList.push(node.getCheckedTreeData({ leaf, tree, ...param }))
      }
      return childrenList
    },
    clearCheckedNode() {
      for (const node of this.getChildrenNodeList()) {
        if (node.notHazyChecked()) { continue }
        node.clearCheckedNode()
        node.setAllChecked(false)
      }
      this.setAllChecked(false)
    },
    setAllChecked(value, deep = false) {
      this.allChecked = value
      this.checkedHalf = false
      deep && this.alterChildrenNodeChecked(value)
    },
    /**
      * 变更子节点状态
      * @param {Boolean} value 状态
      */
    alterChildrenNodeChecked(value) {
      if (this.checkedStrictly === false) { return }
      this.setAllCheckedNumber(value ? this.nodeNumber : 0)
      this.$nextTick(function () {
        for (const node of this.getChildrenNodeList()) {
          node.setAllChecked(value)
          node.setAllCheckedNumber(value ? node.getChildrenNodeNumber() : 0)
          node.alterChildrenNodeChecked(value)
        }
      })
    },
    /**
     * 移除选中的节点
     */
    removeCheckedNode() {
      for (const node of this.getChildrenNodeList()) {
        if (node.notHazyChecked()) { continue }

        if (node.isBranch && node.isAllChecked()) {
          this.removeChildrenNode(node)
          continue
        }
        node.removeCheckedNode()
        if (node.isAllChecked()) {
          this.removeChildrenNode(node)
          continue
        }

        if (node.isHalfChecked()) { node.setAllChecked(false) }
      }
      this.setAllChecked(false)
    },
    pushData(data) {
      if (this.$tools.isEmpty(data)) { return }
      for (const item of [data].flat()) {
        const node = this.findNode(this.defaultFilter(item))
        if (this.$tools.isEmpty(node)) {
          if (this.$tools.isEmpty(this.level)) {
            // TreeRoot
            this.data.push(item)
            continue
          }
          // TreeNode
          if (this.$tools.isEmpty(this.data.children)) {
            this.data.children = []
          }
          this.data.children.push(item)
          continue
        }
        if (this.$type.isArray(item.children) && item.children.length != 0) {
          // 存在子节点
          node.pushData(item.children)
        }
      }
    }
  }
}
