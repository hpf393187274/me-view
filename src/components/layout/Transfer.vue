<template>
  <div :class="addClass('transfer')">
    <me-tree
      ref="leftTree"
      class="transfer-item"
      :class="addClass('flex')"
      :data="source"
      statistics
      checkbox
    >
      <template #node-title="{data}">
        <slot name="node-title" :data="data"/>
      </template>
    </me-tree>
    <div class="transfer-center">
      <slot name="center">
        <me-button @click="target.push(...source); source=[]" :disabled="source.length === 0">全部向右</me-button>
        <me-button @click="rightMove">向右</me-button>
        <me-button @click="leftMove">向左</me-button>
        <me-button @click="source.push(...target); target=[]" :disabled="target.length === 0">全部向左</me-button>
      </slot>
    </div>
    <me-tree
      ref="rightTree"
      class="transfer-item"
      :class="addClass('flex')"
      :data="target"
      statistics
      checkbox
    >
      <template #node-title="{data}">
        <slot name="node-title" :data="data"/>
      </template>
    </me-tree>
  </div>
</template>

<script>
export default {
  name: 'Transfer',
  props: {
    value: {
      type: Array, default() { return [] }
    },
    data: {
      type: Array, default() { return [] }
    },
    leftTitle: {
      type: String,
      default: 'Left'
    },
    rightTitle: {
      type: String,
      default: 'Right'
    },
    showHeader: Boolean
  },
  watch: {
    target(newValue) {
      this.$emit('input', newValue)
    }
  },
  computed: {
    leftTree() {
      return this.$refs.leftTree
    },
    rightTree() {
      return this.$refs.rightTree
    }
  },
  data() {
    return {
      source: [...this.data],

      target: [...this.value]
    }
  },
  methods: {
    leftMove() {
      this.leftTree.pushData(this.rightTree.getCheckedTreeData())
      this.rightTree.removeCheckedNode()
    },
    rightMove() {
      this.rightTree.pushData(this.leftTree.getCheckedTreeData())
      this.leftTree.removeCheckedNode()
    }
  }
}
</script>
