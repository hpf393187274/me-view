<template>
  <div class="tree-node-header">
    <div class="tree-node-item">
      <me-checkbox
        v-if="checkbox"
        :value="allChecked"
        :halfChecked="halfChecked"
        @click="clickCheckbox(!allChecked)"
      />
      <div class="tree-node-lable">
        <slot name="node-lable">{{title}}</slot>
      </div>
      <div class="tree-node-statistics" v-if="statistics && nodeNumber!==0">
        <span>{{allCheckedNumber}}</span>
        <span>/</span>
        <span>{{nodeNumber}}</span>
      </div>
      <div v-if="action" class="em-center tree-node-action">
        <me-link @click="removeCurrentNode">移除</me-link>
        <me-link v-if="lazy" @click="refreshChildrenNode">刷新</me-link>
      </div>
    </div>
    <me-line-row/>
  </div>
</template>

<script>
import treeCommon from '@components/mixins/tree/common'
export default {
  name: 'TreeHeader',
  mixins: [treeCommon],
  props: {
    hasGrandson: Boolean,
    halfChecked: Boolean,
    nodeNumber: { type: Number, default: 0 },
    allCheckedNumber: { type: Number, default: 0 }
  },
  watch: {
    checked(newValue) {
      this.allChecked = newValue
    }
  },
  methods: {
    clickCheckbox(value) {
      this.allChecked = value
      this.$parent.setAllChecked(value, true)
    }
  }
}

</script>
