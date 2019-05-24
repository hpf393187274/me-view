<template>
  <div class="tree-node-body">
    <div class="tree-node-item" :style="{'padding-left': `${indent__}em`}">
      <me-icon v-if="expandable && nodeBranch" @click="handleExpanded">{{iconExpanded}}</me-icon>
      <me-checkbox
        v-if="checkbox"
        :value="allChecked"
        :halfChecked="halfChecked"
        @click="clickCheckbox(!allChecked)"
      />
      <div class="tree-node-lable" @click="click">
        <slot name="node-lable" :data="getData()">{{data.label}}</slot>
      </div>
      <div class="tree-node-statistics" v-if="statistics && nodeNumber!==0">
        <span>{{allCheckedNumber}}</span>
        <span>/</span>
        <span>{{nodeNumber}}</span>
      </div>
      <div v-if="action" class="em-center tree-node-action">
        <me-link @click="removeCurrentNode">移除</me-link>
        <me-link v-if="lazy" @click="refreshChildrenNode">刷新</me-link>
      </div>
    </div>
    <div class="tree-node-children" v-show="expanded__" v-if="renderFirst">
      <me-tree-node
        ref="treeNode"
        :checkbox="checkbox"
        :checked="checkedChildren || data.checked === true"
        :checked-strict="checkedStrict"
        :expanded="expanded"
        :expandable="expandable"
        :expanded-level="expandedLevel"
        :expanded-node-click="expandedNodeClick"
        :indent="indent__+1"
        :level=" level + 1 "
        :data="node"
        :key="node[nodeKey]"
        :lazy="lazy"
        :action="action"
        :statistics="statistics"
        @alter-parent="alterParent"
        @click="handleClick"
        v-for="node in data.children"
      >
        <template slot="node-lable" slot-scope="{data}">
          <slot name="node-lable" :data="data"/>
        </template>
      </me-tree-node>
    </div>
  </div>
</template>

<script>
import treeIndex from '@components/mixins/tree'
import treeCommon from '@components/mixins/tree/common'
import treeInner from './common.mixin'
export default {
  name: 'TreeNode',
  mixins: [treeCommon, treeIndex, treeInner],
  props: {
    data: { type: Object, default() { return {} } },
    level: { type: Number, default: 1 }
  },
  created() {
    this.renderFirst = this.nodeBranch && (this.expandable === false || this.expanded || this.expandedLevel >= this.level)
  },
  watch: {
    checked(newValue) {
      this.checkedChildren = newValue
      this.setAllChecked(newValue)
    }
  },
  data() {
    return {
      expanded__: this.expandable === false || this.expanded || this.expandedLevel >= this.level,
      /**
       * 第一次渲染
       */
      renderFirst: false
    }
  },
  computed: {
    iconExpanded() {
      return this.expanded__ ? 'icon-sort-down' : 'icon-caret-right'
    },
    nodeLeaf() {
      /* 判断当前节点是否为最后一个节点 */
      return this.nodeNumber === 0
    },
    nodeBranch() {
      return this.nodeNumber > 0
    },
    indent__() {
      let value = this.indent
      this.expandable && this.nodeLeaf && (value++)
      return value
    }
  },
  methods: {
    /**
    * 点击 Checkbox
    * @param {Booelan} value 变更后的Checkbox 状态
    */
    clickCheckbox(value) {
      this.setAllChecked(value)
      this.$emit('alter-parent')
      this.alterChildrenNodeChecked(value)
    },
    /**
     * 变更子节点状态
     * @param {Boolean} value 状态
     */
    alterChildrenNodeChecked(value) {
      if (this.checkedStrict === false) { return }
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
    * 获取节点数据
    */
    getData({ deep = false, exclude = ['children'] } = {}) {
      return this.$tools.clone(this.data, { deep, exclude })
    },
    /**
     * 移除当前节点
     */
    removeCurrentNode() {
      this.$emit('remove-node-before', this.getData())
      this.$parent.removeChildrenNode(this)
      this.$emit('remove-node-after', this.getData())
    },
    /**
     * 刷新子节点
     */
    refreshChildrenNode() {
      this.$emit('refresh-node-before', this.getData())
      this.$emit('refresh-node', this.data, this)
      this.$emit('refresh-node-after', this.getData())
    },

    /**
     * 展开子节点
     */
    handleExpanded() {
      if (this.expandable === false) { return }
      this.expanded__ = !this.expanded__
      if (this.renderFirst === false) {
        this.renderFirst = true
        this.alterChildrenNodeChecked(this.allChecked)
      }
    },
    click() {
      if (this.nodeBranch && this.expandedNodeClick) {
        this.handleExpanded()
      }
      if (this.nodeLeaf) {
        this.$emit('click', this.getData(), this)
      }
    },
    /**
     * 获取子节点个数
     */
    getChildrenNodeNumber() { return this.nodeNumber },
    /**
     * 获取选中的叶子节点数据
     * @param {Boolean} param.leaf 是否包含叶子节点：默认：true
     */
    getCheckedData({ filter, ...param } = {}) {
      const list = []
      if (this.nodeLeaf) {
        const resource = this.getData()
        list.push(this.$type.isFunction(filter) ? filter(resource) : resource)
      }
      list.push(...this.getCheckedChildren({ filter, ...param }))
      return list
    },
    /**
     * 获取选中的数据(TreeData)
     * @param {Boolean} param.leaf 是否包含叶子节点：默认：true
     */
    getCheckedTreeData({ ...param } = {}) {
      if (this.allChecked) {
        return this.getData({ deep: true })
      }
      const resource = this.getData()
      const childrenList = this.getCheckedChildren({ ...param })
      if (childrenList.length !== 0) {
        resource.children = [...childrenList]
      }
      return resource
    }
  }
}

</script>
