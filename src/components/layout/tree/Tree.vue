<template>
  <div class="me-column me-tree" style="overflow: auto;">
    <me-tree-header
      :action="action"
      :allCheckedNumber="allCheckedNumber"
      :checkbox="checkbox"
      :checked="allChecked"
      :checked-strict="false"
      :checkedHalf="checkedHalf"
      :disabled="length === 0"
      :hasGrandson="hasGrandson"
      :label="label"
      :lazy="lazy"
      :nodeNumber="nodeNumber"
      :statistics="statistics"
      class="node-header"
      v-if="header"
    >
      <template #node-label>
        <slot name="node-header"/>
      </template>
    </me-tree-header>
    <template v-if="data && data.length > 0">
      <me-tree-node
        :action="action"
        :checkbox="checkbox"
        :checked="checkedChildren"
        :checked-strict="checkedStrict"
        :data="node"
        :expandable="expandable"
        :expanded="expanded"
        :expanded-level="expandedLevel"
        :expanded-node-click="expandedNodeClick"
        :key="node[nodeKey]"
        :lazy="lazy"
        :statistics="statistics"
        @alter-parent="alterParent"
        @click="handleClick"
        ref="treeNode"
        v-for="node in data"
      >
        <template #node-label="{data}">
          <slot :data="data" name="node-label"/>
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
  computed: {
    length() {
      return this.$type.isArray(this.data) ? this.data.length : 0
    }
  },
  created() {
    this.$nextTick(() => {
      this.hasGrandson = this.getHasGrandson()
    })
  },
  methods: {
    getHasGrandson() {
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
