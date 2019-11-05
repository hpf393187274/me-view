
export default {
  props: {
    /**
     * 展开所有
     */
    expandedAll: Boolean,

    /**
     * 可展开的
     */
    expandable: { type: Boolean, default: true },
    /**
     * 严格的选择：默认：true, false 父子联动互不干涉
     */
    checkedStrictly: { type: Boolean, default: true },
    /**
     * 展开级别：默认：0 表示不限制
     */
    expandedLevel: { type: Number, default: 0 },
    /**
     * 点击节点是否展开
     */
    expandedNodeClick: { type: Boolean, default: true },
    /**
     * 是否每次只打开一个同级树节点展开
     * 手风琴模式
     */
    accordion: Boolean,
    /**
     * 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
     */
    nodeKey: { type: String, default: 'id' },
    indent: { type: Number, default: 0 }
  },
  data() {
    return {
      checkedHalf: false,
      checkedNumber: 0,
      checkedHalfNumber: 0,
      checkedChildren: this.checked,
    }
  },
  computed: {
    children() {
      return this.level ? this.data.children : this.data
    },
    /**
     * 获取当前节点的子节点个数
     */
    nodeNumber() {
      /* 获取当前节点的子节点数 */
      return this.$type.isArray(this.children) ? this.children.length : 0
    },
  },
  methods: {
    isAllChecked() {
      return this.allChecked
    },
    isHalfChecked() {
      return this.checkedHalf
    },
    notChecked() {
      return this.allChecked === false
    },
    isHazyChecked() {
      return this.allChecked || this.checkedHalf
    },
    notHazyChecked() {
      return this.isHazyChecked() === false
    },
    isLeaf() { return this.nodeLeaf },
    isBranch() { return this.nodeBranch },
    /**
    * 设置全选的子节点个数
    * @param {Number} value 总数量 
    */
    setAllCheckedNumber(value) { this.checkedNumber = value },
    /**
     * 获取子节点集合
     */
    getChildrenNodeList() {
      const treeNode = this.$refs.treeNode
      if (this.$tools.isEmpty(treeNode)) { return [] }
      return [...treeNode]
    },
    /**
     * 获取 TreeNode
     * @param {Function} filter 过滤函数
     */
    findNode(filter) {
      if (this.$type.isNotFunction(filter)) { return }
      return this.getChildrenNodeList().find(node => filter(node.getData()))
    },
    /**
     * 获取 TreeNode
     * @param {String} key 实体 key
     * @param {*} value 
     */
    findNodeByKey(key = this.nodeKey, value) {
      return this.findNode(item => item[key] === value)
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
    /**
     * 移除子节点
     *  @param {Object} data 要移除的节点
     */
    removeChildrenNode(node) {
      this.$tools.arrayRemove(this.children, this.defaultFilter(node.getData()))
    }
  }
}


