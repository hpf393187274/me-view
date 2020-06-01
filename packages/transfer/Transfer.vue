<template>
  <div class="me-row me-transfer">
    <div class="me-column me-flex transfer-item">
      <div class="me-row" v-if="$slots['header-left']"><slot name="header-left"/></div>
      <me-tree
        :data="data"
        :expanded="expanded"
        :header-label="labelLeft"
        :statistics="statistics"
        checkbox
        class="me-flex me-border"
        header
        ref="leftTree"
      >
        <template #node-label="{data}">
          <slot :data="data" name="node-label" />
        </template>
      </me-tree>
    </div>
    <div class="me-column me-center transfer-center">
      <slot name="center">
        <me-button :disabled="disabledRight" @click="moveToRightAll" icon="icon-angles_strong_right" title="全部向右" />
        <me-button :disabled="disabledRight" @click="moveToRight" icon="icon-angle_strong_right" title="向右" />
        <me-button :disabled="disabledLeft" @click="moveToLeft" icon="icon-angle_strong_left" title="向左" />
        <me-button :disabled="disabledLeft" @click="moveToLeftAll" icon="icon-angles_strong_left" title="全部向左" />
      </slot>
    </div>
    <div class="me-column me-flex transfer-item">
      <div class="me-row" v-if="$slots['header-right']"><slot name="header-right"/></div>
      <me-tree
        :data="value"
        :expanded="expanded"
        :header-label="labelRight"
        :statistics="statistics"
        checkbox
        class="me-flex me-border"
        header
        ref="rightTree"
      >
        <template #node-label="{data}">
          <slot :data="data" name="node-label" />
        </template>
      </me-tree>
    </div>
  </div>
</template>

<script>
import Tools from 'me-view/src/script/tools'
import TreeProp from '../tree/tree-prop'
export default {
  name: 'MeTransfer',
  mixins: [ TreeProp ],
  props: {
    value: { type: Array, default () { return [] } },
    data: { type: Array, default () { return [] } },
    expanded: Boolean,
    labelLeft: { type: String, default: '来源' },
    labelRight: { type: String, default: '目标' },
    showHeader: Boolean
  },
  computed: {
    disabledLeft () {
      return this.value.length === 0
    },
    disabledRight () {
      return this.data.length === 0
    },
    leftTree () {
      return this.$refs.leftTree
    },
    rightTree () {
      return this.$refs.rightTree
    }
  },
  methods: {
    moveToLeftAll () {
      this.data.push(...this.value)
      Tools.clearEmpty(this.value)
    },
    moveToLeft () {
      this.leftTree.pushData(this.rightTree.getCheckedTreeData())
      this.rightTree.removeCheckedNode()
    },
    moveToRight () {
      this.rightTree.pushData(this.leftTree.getCheckedTreeData())
      this.leftTree.removeCheckedNode()
    },
    moveToRightAll () {
      this.value.push(...this.data)
      Tools.clearEmpty(this.data)
    }
  }
}
</script>
