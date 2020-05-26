<template>
  <div class="me-column me-tree" style="overflow: auto;">
    <me-tree-header
      :action="action"
      :checkbox="checkbox"
      :checked="allChecked"
      :checked-number="checkedNumber"
      :checkedHalf="checkedHalf"
      :disabled="length === 0"
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
      <div style="overflow: auto;">
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
      </div>
    </template>
    <div class="me-empty" v-else>暂无数据</div>
  </div>
</template>

<script>
import Type from 'me-view/src/script/type'
import TreeIndex from './tree-index'
import TreeCommon from './tree-common'
import treeInner from './common.mixin'
import TreeHeader from './TreeHeader'
import TreeNode from './TreeNode'
import Vue from 'vue'
export default {
  name: 'MeTree',
  mixins: [ TreeCommon, TreeIndex, treeInner ],
  components: {
    [TreeHeader.name]: TreeHeader,
    [TreeNode.name]: TreeNode
  },
  props: {
    data: { type: Array, default () { return [] } },
    header: Boolean
  },
  data () {
    return {
      eventTree: new Vue()
    }
  },
  computed: {
    length () {
      return Type.isArray(this.data) ? this.data.length : 0
    }
  },
  created () {
    this.$nextTick(() => {
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
    handlerOn (eventName) {
      this.eventTree.$on(eventName, (...option) => {
        this.$emit(eventName, ...option)
      })
    },
    getCheckedData ({ leaf = true, ...param } = {}) {
      return this.getCheckedChildren({ leaf, ...param })
    },
    getCheckedTreeData ({ leaf = true } = {}) {
      return this.getCheckedChildren({ leaf, tree: true })
    }
  }
}
</script>
