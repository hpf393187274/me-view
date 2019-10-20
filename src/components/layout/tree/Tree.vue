<template>
  <div class="me-column me-tree" style="overflow: auto;">
    <me-tree-header
      :action="action"
      :checkbox="checkbox"
      :checked="allChecked"
      :checked-number="checkedNumber"
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
      <template #node-header>
        <slot name="node-header" />
      </template>
    </me-tree-header>
    <template v-if="data && data.length > 0">
      <me-tree-node
        :action="action"
        :checkbox="checkbox"
        :checked="checkedChildren"
        :checked-strictly="checkedStrictly"
        :data="node"
        :event-tree="eventTree"
        :expandable="expandable"
        :expanded-all="expandedAll"
        :expanded-level="expandedLevel"
        :expanded-node-click="expandedNodeClick"
        :key="node.primaryKey"
        :lazy="lazy"
        :primary-key="node.primaryKey"
        :statistics="statistics"
        @alter-parent="alterParent"
        ref="treeNode"
        v-for="node in data"
      >
        <template #node-label="{data}">
          <slot :data="data" name="node-label" />
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
import Vue from 'vue'
export default {
  name: 'MeTree',
  mixins: [treeCommon, treeIndex, treeInner],
  props: {
    data: { type: Array, default() { return [] } },
    header: Boolean
  },
  data() {
    return {
      hasGrandson: false,
      eventTree: new Vue()
    }
  },
  computed: {
    length() {
      return this.$type.isArray(this.data) ? this.data.length : 0
    }
  },
  created() {
    this.initPrimaryKey(this.data)
    this.$nextTick(() => {
      this.hasGrandson = this.getHasGrandson()
      // 点击节点
      this.handlerOn('click-node')
      this.handlerOn('click-node-branch')
      this.handlerOn('click-node-leaf')

      // 移出节点
      this.handlerOn('remove-node')

      // 刷新节点
      this.handlerOn('refresh-node')
    })
  },
  methods: {
    handlerOn(eventName) {
      this.eventTree.$on(eventName, (...option) => {
        this.$emit(eventName, ...option)
      })
    },
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
