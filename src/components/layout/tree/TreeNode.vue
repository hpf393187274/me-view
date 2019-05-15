<template>
  <div class="tree-node">
    <div class="tree-node-item" :style="{'padding-left': `${indent}em`}">
      <me-icon v-if="nodeBranch" @click="expand__ = !expand__">{{iconExpand}}</me-icon>
      <me-checkbox
        v-if="checkbox"
        :value="checked__"
        :indeterminate="indeterminate"
        @click="clickCheckbox(!checked__)"
      />
      <div class="tree-node-title" @click="click({ level })">
        <slot name="node-title" :data="{...data, children: undefined}">{{data.text}}</slot>
      </div>
      <div class="tree-node-statistics" v-if="statistics && nodeNumber!==0">
        <span>{{checkedNumber}}</span>
        <span>/</span>
        <span>{{nodeNumber}}</span>
      </div>
      <div v-if="action" class="em-center tree-node-action">
        <me-link @click="removeNode">移除</me-link>
        <me-link v-if="lazy" @click="refreshNode">刷新</me-link>
      </div>
    </div>
    <div class="tree-node-children" v-show="expand__" v-if="nodeBranch">
      <me-tree-node
        ref="treeNode"
        :checkbox="checkbox"
        :level=" level + 1 "
        :expand="expand"
        :expand-level="expandLevel"
        :click-node-expand="clickNodeExpand"
        :checked="checked || data.checked === true"
        :parent-indent="indent"
        @remove-children-node="removeChildrenNode"
        @alter-checked-number="alterCheckedNumber"
        @alter-indeterminate-number="alterIndeterminateNumber"
        v-for="node in data.children"
        :data="node"
        :key="node[nodeKey]"
        :lazy="lazy"
        :action="action"
        :statistics="statistics"
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
      return this.expand__ ? 'icon-sort-down' : 'icon-caret-right'
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
  methods: {
    removeNode() {
      this.$emit('remove-node-before', this.getData())
      this.$emit('remove-children-node', this)
      this.$emit('remove-node-after', this.getData())
    },
    refreshNode() {
      this.$emit('refresh-node-before', this.getData())
      this.$emit('refresh-node', this)
      this.$emit('refresh-node-after', this.getData())
    },
    /**
     * 移除子节点
     *  @param {Object} data 要移除的节点
     */
    removeChildrenNode(node) {
      this.$tools.arrayRemove(this.data.children, this.defaultFilter(node.getData()))
      if (node.isChecked()) {
        this.alterCheckedNumber(-1)
      }
    },
    click({ level }) {
      if (this.nodeBranch && this.clickNodeExpand) {
        this.expand__ = !this.expand__
      }
      // 点击级别 与 当前节点级别一致
      if (level === this.level) {
        this.$emit('click', { level, data: this.data })
      }
    },
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
