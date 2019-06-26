<template>
  <div class="me-row me-transfer">
    <me-tree
      :data="leftData"
      :expanded="expanded"
      :label="leftLabel"
      :statistics="statistics"
      checkbox
      class="me-flex me-border transfer-item"
      header
      ref="leftTree"
    >
      <template #node-label="{data}">
        <slot :data="data" name="node-label"/>
      </template>
    </me-tree>
    <div class="me-column me-center transfer-center">
      <slot name="center">
        <me-button :disabled="disabledRight" @click="moveToRightAll" icon="icon-angle-double-right" label="全部向右"/>
        <me-button :disabled="disabledRight" @click="moveToRight" icon="icon-angle-right" label="向右"/>
        <me-button :disabled="disabledLeft" @click="moveToLeft" icon="icon-angle-left" label="向左"/>
        <me-button :disabled="disabledLeft" @click="moveToLeftAll" icon="icon-angle-double-left" label="全部向左"/>
      </slot>
    </div>
    <me-tree
      :data="rightData"
      :expanded="expanded"
      :label="rightLabel"
      :statistics="statistics"
      checkbox
      class="me-flex me-border transfer-item"
      header
      ref="rightTree"
    >
      <template #node-label="{data}">
        <slot :data="data" name="node-label"/>
      </template>
    </me-tree>
  </div>
</template>

<script>
import treeCommon from '@components/mixins/tree/common'
import treeIndex from '@components/mixins/tree'
export default {
  name: 'MeTransfer',
  mixins: [treeCommon, treeIndex],
  props: {
    value: { type: Array, default() { return [] } },
    data: { type: Array, default() { return [] } },
    leftLabel: { type: String, default: '来源' },
    rightLabel: { type: String, default: '目标' },
    showHeader: Boolean
  },
  watch: {
    right(newValue) {
      this.$emit('input', newValue)
    }
  },
  computed: {
    disabledLeft() {
      return this.rightData.length === 0
    },
    disabledRight() {
      return this.leftData.length === 0
    },
    leftTree() {
      return this.$refs.leftTree
    },
    rightTree() {
      return this.$refs.rightTree
    }
  },
  data() {
    return {
      leftData: [...this.data],
      rightData: [...this.value],
    }
  },
  methods: {
    moveToLeftAll() {
      this.leftData.push(...this.rightData); this.rightData = []
    },
    moveToLeft() {
      this.leftTree.pushData(this.rightTree.getCheckedTreeData())
      this.rightTree.removeCheckedNode()
    },
    moveToRight() {
      this.rightTree.pushData(this.leftTree.getCheckedTreeData())
      this.leftTree.removeCheckedNode()
    },
    moveToRightAll() {
      this.rightData.push(...this.leftData); this.leftData = []
    }
  }
}
</script>
