<template>
  <div :class="addClass('transfer')">
    <div class="transfer-left">
      <div v-if="showHeader" class="transfer-header">
        <div :class="addClass('flex')">{{leftTitle}}</div>
        <div style="margin-right:5px;"></div>
      </div>
      <me-line-row v-if="showHeader"/>
      <me-tree ref="leftTree" :class="addClass('flex')" :data="source" expand checkbox/>
    </div>
    <div class="transfer-center">
      <slot name="center">
        <me-button @click="target=[...source]; source=[]" :disabled="source.length === 0">全部向右</me-button>
        <me-button @click="rightMove">向右</me-button>
        <me-button @click="leftMove">向左</me-button>
        <me-button @click="source=[...target]; target=[]" :disabled="target.length === 0">全部向左</me-button>
      </slot>
    </div>
    <div class="transfer-right">
      <div v-if="showHeader" class="transfer-header">
        <div :class="addClass('flex')">{{rightTitle}}</div>
        <div style="margin-right:5px;"></div>
      </div>
      <me-line-row v-if="showHeader"/>
      <me-tree ref="rightTree" :class="addClass('flex')" :data="target" expand checkbox/>
    </div>
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
