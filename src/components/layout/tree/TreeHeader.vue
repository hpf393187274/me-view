<template>
  <div class="me-column tree-node-header">
    <div :style="{'padding-left': `${indent__}em`}" class="me-row tree-node-item">
      <me-checkbox :checkedHalf="checkedHalf" :disabled="disabled" :value="allChecked" @click="clickCheckbox" v-if="checkbox" />
      <div class="me-row me-flex tree-node-label">
        <slot name="node-label">{{label}}</slot>
      </div>
      <div class="tree-node-statistics" v-if="statistics && nodeNumber!==0">
        <span>{{checkedNumber}}</span>
        <span>/</span>
        <span>{{nodeNumber}}</span>
      </div>
      <div class="em-center tree-node-action" v-if="action">
        <me-link @click="removeCurrentNode">移除</me-link>
        <me-link @click="refreshChildrenNode" v-if="lazy">刷新</me-link>
      </div>
    </div>
    <me-line-h />
  </div>
</template>

<script>
import treeCommon from '@components/mixins/tree/common'
export default {
  name: 'MeTreeHeader',
  mixins: [treeCommon],
  props: {
    hasGrandson: Boolean,
    checkedHalf: Boolean,
    nodeNumber: { type: Number, default: 0 },
    checkedNumber: { type: Number, default: 0 }
  },
  computed: {
    indent__() {
      let value = 0
      if (this.$parent.data.every(item => this.$type.isArray(item.children) === false)) {
        return value
      }
      return ++value
    }
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
