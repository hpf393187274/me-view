<template>
  <me-combo ref="combo" v-bind="$props" v-on="$listeners">
    <me-tree
      ref="comboTree"
      :border="border"
      :data="data"
      :expanded-level="expandedLevel"
      :highlight="highlight"
      :accordion="accordion"
      :field-value="fieldValue"
      :field-label="fieldLabel">
      <slot :data="data" name="node-label" slot="node-label" slot-scope="{data}"/>
    </me-tree>
  </me-combo>
</template>

<script>
import emitter from 'me-view/src/mixins/emitter'
import ComboProps from '../combo/combo.props'
export default {
  mixins: [ ComboProps, emitter ],
  name: 'ComboTree',
  props: {
    expandedLevel: Number,
    /**
     * 是否每次只打开一个同级树节点展开
     * 手风琴模式
     */
    accordion: { type: Boolean, default: true },
    clickEvent: {
      type: String,
      default: 'click',
      validator: value => [ 'click', 'click-leaf', 'click-branch' ].includes(value)
    }
  },
  mounted () {
    this.loadTreeEvent()
  },
  methods: {
    handlerClick ({ data, index }) {
      this.$refs.combo.$emit('me-combo--select', data, index)
    },
    loadTreeEvent () {
      if (this.$refs.comboTree) {
        this.$refs.comboTree.listener(this.clickEvent, this.handlerClick)
      }
    }
  }
}
</script>
