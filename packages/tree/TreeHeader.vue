<template>
  <div class="me-column tree-node-header">
    <div :style="{'padding-left': `${indent__ * indentSize}px`}" class="me-row tree-node-item">
      <me-checkbox :checkedHalf="checkedHalf" :disabled="disabled" :value="checkedAll" @click="clickCheckbox" v-if="checkbox" />
      <div class="me-row me-flex me-cross-center tree-node-label">
        <slot name="node-label">{{headerLabel}}</slot>
      </div>
      <div class="tree-node-statistics" v-if="statistics && nodeNumber !== 0">
        <span>{{checkedNumber}}</span>
        <span>/</span>
        <span>{{nodeNumber}}</span>
      </div>
      <div class="em-center tree-node-action" v-if="action">
        <me-link @click="removeNodeAll">移除</me-link>
        <me-link @click="refreshChildrenNode" v-if="lazy">刷新</me-link>
      </div>
    </div>
    <me-line-h />
  </div>
</template>

<script>
import TreeProp from './tree-prop'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'MeTreeHeader',
  mixins: [ emitter, TreeProp ],
  props: {
    nodeNumber: Number,
    checkedNumber: Number,
    checkedHalf: Boolean,
    parentGrandson: Boolean,
    checked: Boolean,
    headerLabel: String,
    data: { type: Array, default () { return [] } }
  },
  data () {
    return {
      checkedAll: this.checked
    }
  },
  computed: {
    indent__ () {
      if (this.expandable === false) { return 0 }
      if (this.parentGrandson) { return 1 }
      return 0
    }
  },
  watch: {
    checked (newValue) {
      this.checkedAll = newValue
    }
  },
  methods: {
    clickCheckbox (value) {
      this.checkedAll = value
      this.$emit('click', value)
    },
    removeNodeAll () {
      this.clickCheckbox(false)
      this.dispatchUpward('MeTree', 'me-tree--clear')
    }
  }
}

</script>
