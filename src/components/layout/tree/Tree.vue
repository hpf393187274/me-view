<template>
  <div :class="addClass('tree')" style="overflow: auto;">
    <template v-if="data && data.length > 0">
      <me-tree-node
        ref="treeNode"
        :checkbox="checkbox"
        :expanded="expanded"
        :expanded-level="expandedLevel"
        :click-node-expanded="clickNodeExpanded"
        :checked="checked"
        :data="node"
        :key="node[nodeKey]"
        :statistics="statistics"
        :lazy="lazy"
        :action="action"
        @remove-children-node="removeChildrenNode"
        v-for="node in data"
      >
        <template slot="node-title" slot-scope="{data}">
          <slot name="node-title" :data="data"/>
        </template>
      </me-tree-node>
    </template>
    <div :class="addClass('empty')" v-else>暂无数据</div>
  </div>
</template>

<script>
import common from './mixin/common.mixin'
export default {
  name: 'Tree',
  mixins: [common],
  props: {
    data: { type: Array, default() { return [] } }
  },
  methods: {
    getCheckedData({ leaf = true, ...param } = {}) {
      return this.getCheckedChildren({ leaf, ...param })
    },
    getCheckedTreeData({ leaf = true } = {}) {
      return this.getCheckedChildren({ leaf, tree: true })
    },
    /**
     * 移除子节点
     * 事件调用
     */
    removeChildrenNode(node) {
      this.$tools.arrayRemove(this.data, this.defaultFilter(node.getData()))
      if (node.isChecked()) {
        this.alterAllCheckedNumber(-1)
      }
    }
  }
}
</script>
