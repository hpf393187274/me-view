
export default {
  methods: {
    /**
     * 获取子节点选中个数
     * 全选 and 半选
     */
    getCheckedNumber() {
      let allCheckedNumber = 0
      let halfCheckedNumber = 0
      for (const node of this.getChildrenNodeList()) {
        node.isAllChecked() && allCheckedNumber++
        node.isHalfChecked() && halfCheckedNumber++
      }
      this.setAllCheckedNumber(allCheckedNumber)
      this.halfCheckedNumber = halfCheckedNumber
      return { allCheckedNumber, halfCheckedNumber }
    },
    /**
     * 变更父级
     */
    alterParent() {
      const { allCheckedNumber, halfCheckedNumber } = this.getCheckedNumber()
      if (this.checkedStrict) {
        this.allChecked = allCheckedNumber === this.nodeNumber
        if (halfCheckedNumber > 0) {
          this.halfChecked = true
        } else {
          this.halfChecked = allCheckedNumber > 0 && allCheckedNumber < this.nodeNumber
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
      this.halfChecked = false
      deep && this.alterChildrenNodeChecked(value)
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
