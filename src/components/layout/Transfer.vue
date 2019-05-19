<template>
  <div :class="addClass('transfer')">
    <me-tree
      ref="sourceTree"
      class="transfer-item"
      header
      checkbox
      :class="addClass('flex')"
      :data="source"
      :title="sourceTitle"
      :statistics="statistics"
    >
      <template #node-title="{data}">
        <slot name="node-title" :data="data"/>
      </template>
    </me-tree>
    <div class="transfer-center">
      <slot name="center">
        <me-button @click="target.push(...source); source=[]" :disabled="source.length === 0">全部向右</me-button>
        <me-button @click="targetMove">向右</me-button>
        <me-button @click="sourceMove">向左</me-button>
        <me-button @click="source.push(...target); target=[]" :disabled="target.length === 0">全部向左</me-button>
      </slot>
    </div>
    <me-tree
      ref="targetTree"
      class="transfer-item"
      header
      checkbox
      :class="addClass('flex')"
      :data="target"
      :title="targetTitle"
      :statistics="statistics"
    >
      <template #node-title="{data}">
        <slot name="node-title" :data="data"/>
      </template>
    </me-tree>
  </div>
</template>

<script>
import treeCommon from '@components/mixins/tree/common'
export default {
  name: 'Transfer',
  mixins: [treeCommon],
  props: {
    value: { type: Array, default() { return [] } },
    data: { type: Array, default() { return [] } },
    sourceTitle: { type: String, default: 'source' },
    targetTitle: { type: String, default: 'target' },
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
