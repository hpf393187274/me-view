<template>
  <div :class="addClass('tree')">
    <template v-if="data && data.length > 0">
      <vv-tree-node
        ref="treeNode"
        :show-checkbox="showCheckbox"
        :expand="expand"
        :checked="checked"
        :data="node"
        :key="index"
        @remove-children="removeChildren"
        v-for="(node,index) in data"
      >
        <template slot="node-title" slot-scope="{data}">
          <slot name="node-title" :data="data"/>
        </template>
      </vv-tree-node>
    </template>

    <div :class="addClass('empty')" v-else>暂无数据</div>
  </div>
</template>

<script>
import { type } from '@assets/script/common'
import common from './mixin/common.mixin'
export default {
  name: 'Tree',
  mixins: [common],
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
      validator: value => type.isArray(value)
    }
  },
  methods: {
    getChildrenData(deep = true) {
      return this.$tools.clone(this.data, deep)
    },
    getCheckedData(param = { leaf: true }) {
      return this.getCheckedChildren(param)
    },
    getCheckedTreeData(param = { leaf: true }) {
      return this.getCheckedChildren(Object.assign(param || {}, { tree: true }))
    },
    clearData() {
      this.data.splice(0, this.data.length)
    },
    setData(data = []) {
      this.clearData()
      this.data.push(...data)
    },
    /**
     * 移除子节点
     * 事件调用
     */
    removeChildren(data = {}) {
      this.$tools.arrayRemove(this.data, this.defaultFilter(data))
    }
  }
}
</script>
