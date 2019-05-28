<template>
  <div class="me-row me-transfer">
    <me-tree
      ref="sourceTree"
      class="me-flex me-border transfer-item"
      header
      checkbox
      :data="source"
      :label="sourceLabel"
      :expanded="expanded"
      :statistics="statistics"
    >
      <template #node-label="{data}">
        <slot name="node-label" :data="data"/>
      </template>
    </me-tree>
    <div class="me-column me-center transfer-center">
      <slot name="center">
        <me-button @click="target.push(...source); source=[]" :disabled="source.length === 0">全部向右</me-button>
        <me-button @click="targetMove">向右</me-button>
        <me-button @click="sourceMove">向左</me-button>
        <me-button @click="source.push(...target); target=[]" :disabled="target.length === 0">全部向左</me-button>
      </slot>
    </div>
    <me-tree
      ref="targetTree"
      class="me-flex me-border transfer-item"
      header
      checkbox
      :data="target"
      :label="targetLabel"
      :expanded="expanded"
      :statistics="statistics"
    >
      <template #node-label="{data}">
        <slot name="node-label" :data="data"/>
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
    sourceLabel: { type: String, default: '来源' },
    targetLabel: { type: String, default: '目标' },
    showHeader: Boolean
  },
  watch: {
    target(newValue) {
      this.$emit('input', newValue)
    }
  },
  computed: {
    sourceTree() {
      return this.$refs.sourceTree
    },
    targetTree() {
      return this.$refs.targetTree
    }
  },
  data() {
    return {
      source: [...this.data],

      target: [...this.value]
    }
  },
  methods: {
    sourceMove() {
      this.sourceTree.pushData(this.targetTree.getCheckedTreeData())
      this.targetTree.removeCheckedNode()
    },
    targetMove() {
      this.targetTree.pushData(this.sourceTree.getCheckedTreeData())
      this.sourceTree.removeCheckedNode()
    }
  }
}
</script>
