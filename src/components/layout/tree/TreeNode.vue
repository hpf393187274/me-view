<template>
  <div class="tree-node">
    <div class="tree-node-item" :style="{'padding-left': `${indent}em`}">
      <me-icon v-if="nodeBranch" @click="handleExpanded">{{iconExpanded}}</me-icon>
      <me-checkbox
        v-if="checkbox"
        :value="allChecked"
        :halfChecked="halfChecked"
        @click="clickCheckbox(!allChecked)"
      />
      <div class="tree-node-title" @click="click">
        <slot name="node-title" :data="getData()">{{data.label}}</slot>
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
    <div class="tree-node-children" v-show="expanded__" v-if="childrenRendered">
      <me-tree-node
        ref="treeNode"
        :checkbox="checkbox"
        :level=" level + 1 "
        :expanded="expanded"
        :expanded-level="expandedLevel"
        :click-node-expanded="clickNodeExpanded"
        :checked="checkedChildren || data.checked === true"
        :parent-indent="indent"
        @alter-parent="alterParent"
        v-for="node in data.children"
        :data="node"
        :key="node[nodeKey]"
        :lazy="lazy"
        :action="action"
        :statistics="statistics"
      >
        <template slot="node-title" slot-scope="{data}">
          <slot name="node-title" :data="data"/>
        </template>
      </me-tree-node>
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
    data: { type: Object, default() { return {} } },
    level: { type: Number, default: 1 },
    parentIndent: { type: Number, default: 0 }
  },
  data() {
    return {
      expanded__: this.expanded
    }
  },
  computed: {
    iconExpanded() {
      return this.expanded__ ? 'icon-sort-down' : 'icon-caret-right'
    },
    childrenRendered() {
      if (this.nodeLeaf) { return false }

      return this.expanded__ || this.expandedLevel >= this.level
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
      this.expanded__ = !this.expanded__
      this.alterChildrenNodeChecked(this.allChecked)
    },
    click() {
      if (this.nodeBranch && this.clickNodeExpanded) {
        this.handleExpanded()
      }
      if (this.nodeLeaf) {
        this.$emit('click', { data: this.getData() })
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
