<template>
  <div class="me-column tree-node-header">
    <div class="me-row tree-node-item" :style="{'padding-left': `${indent__}em`}">
      <me-checkbox
        v-if="checkbox"
        :value="allChecked"
        :halfChecked="halfChecked"
        @click="clickCheckbox(!allChecked)"
      />
      <div class="me-row me-flex tree-node-lable">
        <slot name="node-lable">{{lable}}</slot>
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
  name: 'MeTreeHeader',
  mixins: [treeCommon],
  props: {
    hasGrandson: Boolean,
    halfChecked: Boolean,
    nodeNumber: { type: Number, default: 0 },
    allCheckedNumber: { type: Number, default: 0 }
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
