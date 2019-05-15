<template>
  <div class="tree-node">
    <div class="tree-node-item" :style="{'padding-left': `${indent}em`}">
      <me-icon v-if="nodeBranch" @click="expand__ = !expand__">{{iconExpand}}</me-icon>
      <me-checkbox
        v-if="showCheckbox"
        :value="checked__"
        :indeterminate="indeterminate"
        @click="clickCheckbox(!checked__)"
      />
      <div class="tree-node-title" @click="click({ level })">
        <slot name="node-title" :data="{...data, children: undefined}">{{data.text}}</slot>
      </div>
    </div>
    <div class="tree-node-children" v-show="expand__" v-if="nodeBranch">
      <me-tree-node
        ref="treeNode"
        :show-checkbox="showCheckbox"
        :level=" level + 1 "
        :expand="expand"
        :checked="checked || data.checked === true"
        :parent-indent="indent"
        @remove-children="removeChildren"
        @alter-checked-number="alterCheckedNumber"
        @alter-indeterminate-number="alterIndeterminateNumber"
        v-for="(node,index) in data.children"
        :data="node"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import common from './mixin/common.mixin'
import checkbox from './mixin/checkbox.mixin'
export default {
  name: 'TreeNode',
  mixins: [common, checkbox],
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    level: { type: Number, default: 1 },
    parentIndent: { type: Number, default: 0 }
  },
  computed: {
    iconExpand() {
      return this.expand__ ? 'icon-caret-right' : 'icon-sort-down'
    },
    /**
     * 获取当前节点的子节点个数
     */
    nodeNumber() {
      const children = this.data.children
      /* 获取当前节点的子节点数 */
      return this.$type.isArray(children) ? children.length : 0
    },
    nodeLeaf() {
      /* 判断当前节点是否为最后一个节点 */
      return this.nodeNumber === 0
    },
    nodeBranch() {
      return this.nodeNumber > 0
    },
    indent() {
      let value = this.parentIndent + 1
      this.nodeLeaf && (value++)
      return value
    }
  },
  watch: {
    nodeNumber(newValue) {
      newValue === 0 && this.$emit('remove-children', this.$tools.clone(this.data))
    }
  },
  methods: {
    removeNode(data = {}) {
      if (this.$type.isArray(data.children) && data.children.length > 0) {
        this.batchRemoveNode(data.children)
      } else {
        this.$emit('remove-children', this.$tools.clone(data))
        this.$emit('modify-parent', { newState: -1, oldState: 1 })
      }
    },
    removeChildren(data = {}) {
      this.$tools.arrayRemove(this.data.children, this.defaultFilter(data))
    },
    click({ level }) {
      if (this.nodeBranch && this.expandClickNode) {
        this.expand__ = !this.expand__
      }
      // 点击级别 与 当前节点级别一致
      if (level === this.level) {
        this.$emit('click', { level, data: this.data })
      }
    },
    getCheckedData({ leaf = true, filter, ...param } = {}) {
      const list = []
      if (leaf === true && this.nodeBranch) {
        // 如果不获取 tree 并且 只获取叶子节点 ，但当前节点不是叶子节点
        list.push(...this.getCheckedChildren({ leaf, filter, ...param }))
      } else {
        const resource = this.getData()
        list.push(this.$type.isFunction(filter) ? filter(resource) : resource)
      }
      return list
    },
    getCheckedTreeData({ leaf = true, ...param } = {}) {
      if (leaf === false && this.nodeLeaf) {
        return null
      }
      const resource = this.getData()
      const childrenList = this.getCheckedChildren({ leaf, ...param, tree: true })
      if (childrenList.length !== 0) {
        resource.children = [...childrenList]
      }
      return resource
    }
  }
}

</script>
