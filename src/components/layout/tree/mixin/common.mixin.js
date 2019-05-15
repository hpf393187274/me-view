export default {
  props: {
    /**
     * 是否展开的
     */
    expand: Boolean,
    expandClickNode: { type: Boolean, default: true },
    /* 是否存在复选框 */
    showCheckbox: { type: Boolean, default: false },
    /* 是否默认选中 */
    checked: { type: Boolean, default: false },
    /**
     * 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
     */
    nodeKey: { type: String, default: 'id' }
  },
  data() {
    return {
      expand__: this.expand
    }
  },
  methods: {
    /**
     * 获取节点数据
     */
    getData(deep = false) {
      return this.$tools.clone(this.data.resource ? this.data.resource : this.data, { deep })
    },
    getCheckedChildren({ leaf = true, tree = false, ...param } = {}) {
      const childrenList = []
      for (const node of this.getNodeList()) {
        if (node.$data.checked__ || node.$data.indeterminate) {
          if (tree === true) {
            if (leaf === false && this.nodeLeaf) {
              return null
            }
            childrenList.push(node.getCheckedTreeData({ leaf, tree, ...param }))
          } else {
            childrenList.push(...node.getCheckedData({ leaf, tree, ...param }))
          }
        }
      }
      return childrenList
    },
    /**
     * 获取 TreeNode
     * @param {Function} filter 过滤函数
     */
    findTreeNode(filter) {
      if (this.$type.isNotFunction(filter)) { return }
      return this.getNodeList().find(treeNode => filter(treeNode.$props.data))
    },
    /**
     * 获取 TreeNode
     * @param {String} key 实体 key
     * @param {*} value 
     */
    findTreeNodeByKey(key = this.nodeKey, value) {
      return this.findTreeNode(item => item[key] === value)
    },
    /**
     * 获取默认过滤器
     * @param {*} value 比对值
     */
    defaultFilter(value) {
      if (this.$type.isObjectOrArray(value)) {
        return item => item[this.nodeKey] === value[this.nodeKey]
      }
      return item => item[this.nodeKey] === value
    },
    getNodeList() {
      const treeNode = this.$refs.treeNode
      if (this.$tools.isEmpty(treeNode)) { return [] }
      return [treeNode].flat()
    },
    /**
     * 移除
     * @param {Array} data 
     */
    batchRemoveNode(data = []) {
      if (this.$type.isNotArray(data)) { return }
      for (const item of data) {
        const treeNode = this.findTreeNode(this.defaultFilter(this.$tools.clone(item)))
        if (this.$tools.isEmpty(treeNode)) { continue }
        treeNode.removeNode(item)
      }
    },
    pushData(data) {
      if (this.$tools.isEmpty(data)) { return }
      for (const item of [data].flat()) {
        const itemNode = this.findTreeNode(this.defaultFilter(item))
        if (this.$tools.isEmpty(itemNode)) {
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
          itemNode.pushData(item.children)
        }
      }
    }
  }
}
