<template>
  <me-combo ref="combo" v-bind="$props" v-model="value__">
    <me-tree
      :border="border"
      :data="data"
      :expanded-level="expandedLevel"
      :expanded-node-click="false"
      :highlight="highlight"
      :node-key="fieldValue"
      :field-value="fieldValue"
      :field-label="fieldLabel"
      @click-node="handlerClick"
      ref="tree"
    >
      <template #node-label="{data}">
        <slot :data="data" name="node-label" />
      </template>
    </me-tree>
  </me-combo>
</template>

<script>
import ComboMixin from '../combo/combo.mixin'
import Combo from '../combo'
export default {
  components: { [Combo.name]: Combo },
  mixins: [ ComboMixin ],
  name: 'MeComboTree',
  props: {
    expandedLevel: { type: Number },
    placeholder: String
  },
  watch: {
    value (value) { this.value__ = value }
  },
  created () {
    this.value__ = this.value
  },
  methods: {
    handlerClick (row, index) {
      this.$emit('me-combo--select', row, index)
    }
  }
}
</script>
