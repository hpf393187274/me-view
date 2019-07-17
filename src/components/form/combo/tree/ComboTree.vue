<template>
  <me-combo-select
    :clearable="clearable"
    :data="data"
    :disabled="disabled"
    :field-label="fieldLabel"
    :field-value="fieldValue"
    :multiple="multiple"
    :placeholder="placeholder"
    ref="combo"
    v-model="value__"
  >
    <template #options>
      <me-tree :border="border" :data="data" :expanded-node-click="false" :node-key="fieldValue" @click-node="onClickNode" ref="tree"></me-tree>
    </template>
  </me-combo-select>
</template>

<script>
import ComboMixin from '../combo.mixin'
export default {
  mixins: [ComboMixin],
  name: 'MeComboTree',
  watch: {
    value(value) { this.value__ = [...value] }
  },
  created() {
    this.value__ = [...this.value]
  },
  methods: {
    onClickNode(row, index) {
      this.$refs.combo.clickOption(row, index)
      this.$emit('input', this.multiple ? [...this.value__] : this.value__)
    }
  }
}
</script>
