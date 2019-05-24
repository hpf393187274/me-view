<template>
  <div class="me-column me-tree" style="overflow: auto;">
    <me-tree-header
      v-if="header"
      class="node-header"
      :checkbox="checkbox"
      :checked="allChecked"
      :halfChecked="halfChecked"
      :label="label"
      :hasGrandson="hasGrandson"
      :checked-strict="false"
      :nodeNumber="nodeNumber"
      :allCheckedNumber="allCheckedNumber"
      :statistics="statistics"
      :action="action"
      :lazy="lazy"
    >
      <template #node-label>
        <slot name="node-header"/>
      </template>
    </me-tree-header>
    <template v-if="data && data.length > 0">
      <me-tree-node
        ref="treeNode"
        :expanded="expanded"
        :expandable="expandable"
        :expanded-level="expandedLevel"
        :expanded-node-click="expandedNodeClick"
        :checkbox="checkbox"
        :checked="checkedChildren"
        :checked-strict="checkedStrict"
        :data="node"
        :key="node[nodeKey]"
        :statistics="statistics"
        :lazy="lazy"
        :action="action"
        @alter-parent="alterParent"
        @click="handleClick"
        v-for="node in data"
      >
        <template #node-label="{data}">
          <slot name="node-label" :data="data"/>
        </template>
      </me-tree-node>
    </template>
    <div class="me-empty" v-else>暂无数据</div>
  </div>
</template>

<script>
import treeIndex from '@components/mixins/tree'
import treeCommon from '@components/mixins/tree/common'
import treeInner from './common.mixin'
export default {
  name: 'MeTree',
  mixins: [treeCommon, treeIndex, treeInner],
  props: {
    data: { type: Array, default() { return [] } },
    header: Boolean
  },
  data() {
    return {
      hasGrandson: false
    }
  },
  created() {
    this.$nextTick(() => {
      this.hasGrandson = this.getHasGrandson()
    })
  },
  methods: {
    getHasGrandson() {
      for (const node of this.getChildrenNodeList()) {
        console.log(node.isBranch())
      }
      return this.getChildrenNodeList().some(node => node.isBranch() === true)
    },
    getCheckedData({ leaf = true, ...param } = {}) {
      return this.getCheckedChildren({ leaf, ...param })
    },
    getCheckedTreeData({ leaf = true } = {}) {
      return this.getCheckedChildren({ leaf, tree: true })
    }
  }
}
</script>
