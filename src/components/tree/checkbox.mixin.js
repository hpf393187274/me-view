export default {
  props: {
    /* 是否存在复选框 */
    hasCheckbox: { type: Boolean, default: false },
    /* 是否默认选中 */
    checked: { type: Boolean, default: false },
    level: { type: Number, default: 1 }
  },
  data() {
    return {
      /* 复选框状态：1 全选，0 未选，-1 半选 */
      stateCheckbox: this.checked,
      childrenCheckedNumner: 0,
      childrenIndeterminateNumner: 0,
      stateView: this.checked ? 1 : -1,
      // 点击的节点级别，默认为 0 = 未点击
      clickLevel: 0
    }
  },
  computed: {
    /**
     * 获取当前节点的子节点个数
     */
    nodeNumber() {
      const children = this.nodeData.children
      /* 获取当前节点的子节点数 */
      return children ? children.length : 0
    }
  },
  watch: {
    stateView(newValue, oldValue) {
      if (newValue === 0) {
        this.$refs.checkbox.indeterminate = true
        this.stateCheckbox = true
      } else {
        this.$refs.checkbox.indeterminate = false
        if (newValue === 1) {
          this.stateCheckbox = true
        }
        if (newValue === -1) {
          this.stateCheckbox = false
        }
      }
      if (this.clickLevel < this.level) {
        // 点击节点级别 小于 当前节点级别 => 变更 父节点
        this.changeChildren({level: this.clickLevel, newState: newValue})
      }
      if (this.level > 1 && this.clickLevel > this.level) {
        // 点击节点级别 大于 当前节点级别 => 变更 父节点
        this.$emit('modifyParent', { level: this.clickLevel, newState: newValue, oldState: oldValue })
      }
    }
  },
  methods: {
    /**
     * 点击 Checkbox 事件
     */
    changeCheckbox() {
      this.clickLevel = this.level
      const param = {
        level: this.clickLevel,
        oldState: this.stateView,
        newState: (this.stateView = this.stateCheckbox ? 1 : -1)
      }
      // 变更父节点
      this.$emit('modifyParent', param)
      // 变更子节点
      this.childrenCheckedNumner = 0
      this.childrenIndeterminateNumner = 0
      this.changeChildren(param)
    },
    /**
     * 变更行为
     */
    changeChildren(param) {
      this.childrenCheckedNumner = param.newState === 1 ? this.nodeNumber : 0
      this.$children.forEach((component) => {
        component.modifyChildren(param)
      })
    },
    /**
     * 变更父节点
     * 事件变更
     * @param {level:'当前点击级别', state:'子节点状态' }
     */
    modifyParent({ level, newState, oldState }) {
      this.clickLevel = level
      if (oldState === -1) {
        ++this.childrenCheckedNumner
      } else {
        if (newState === -1) {
          --this.childrenCheckedNumner
        }
      }
      if (oldState !== 0 && newState === 0) {
        ++this.childrenIndeterminateNumner
      }
      if (oldState === 0 && newState !== 0) {
        --this.childrenIndeterminateNumner
      }
      if (this.childrenCheckedNumner === 0) {
        this.stateView = -1
      } else {
        if (this.childrenCheckedNumner === this.nodeNumber && this.childrenIndeterminateNumner === 0) {
          this.stateView = 1
        } else {
          this.stateView = 0
        }
      }
    },
    /**
     * 变更子节点
     * 向下变更
     * @param { level:'当前点击级别',state:'父节点状态' }
     */
    modifyChildren({ level, newState }) {
      this.clickLevel = level
      this.stateView = newState
    }
  }
}
