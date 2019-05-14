<template>
  <div :class="addClass('column','flex')">
    <vv-button @click="add">add</vv-button>
    <vv-button @click="remove">remove</vv-button>
    <div :class="addClass('transfer')">
      <div class="transfer-left">
        <div v-if="showHeader" class="transfer-header">
          <div :class="addClass('flex')">{{leftTitle}}</div>
          <div style="margin-right:5px;"></div>
        </div>
        <vv-line-row v-if="showHeader"/>
        <vv-tree ref="leftTree" :class="addClass('flex')" :data="data" expand show-checkbox/>
      </div>
      <div class="transfer-center">
        <slot name="center">
          <vv-button @click="rightMoveAll" :disabled="data.length === 0">全部向右</vv-button>
          <vv-button @click="rightMove">向右</vv-button>
          <vv-button @click="leftMove">向左</vv-button>
          <vv-button @click="leftMoveAll" :disabled="target.length === 0">全部向左</vv-button>
        </slot>
      </div>
      <div class="transfer-right">
        <div v-if="showHeader" class="transfer-header">
          <div :class="addClass('flex')">{{rightTitle}}</div>
          <div style="margin-right:5px;"></div>
        </div>
        <vv-line-row v-if="showHeader"/>
        <vv-tree ref="rightTree" :class="addClass('flex')" :data="target" expand show-checkbox/>
      </div>
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
      target: []
    }
  },
  methods: {
    leftMove() {
      const checkTreeData = this.rightTree.getCheckedTreeData()
      this.leftTree.pushData(checkTreeData)
      this.rightTree.batchRemoveNode(checkTreeData)
    },
    rightMove() {
      const checkTreeData = this.leftTree.getCheckedTreeData()
      this.rightTree.pushData(checkTreeData)
      this.leftTree.batchRemoveNode(checkTreeData)
    },
    leftMoveAll() {
      this.leftTree.setData(this.rightTree.$props.data)
      this.rightTree.clearData()
    },
    rightMoveAll() {
      this.rightTree.setData(this.leftTree.$props.data)
      this.leftTree.clearData()
    },
    add() {
      this.leftTree.pushData({ id: this.data.length + 1, text: `root-${this.data.length + 1}` })
    },
    remove() {
      this.$tools.arrayRemove(this.leftTree.$props.data, this.length - 1)
    }
  }
}
</script>
