<template>
  <me-combo-select
    :clearable="clearable"
    :data="data"
    :disabled="disabled"
    :field-label="fieldLabel"
    :field-value="fieldValue"
    :highlight="highlight"
    :multiple="multiple"
    :placeholder="placeholder"
    :readonly="readonly"
    ref="combo"
    v-model="value__"
  >
    <template #options>
      <me-table :border="border" :data="data" :highlight="highlight" @click-row="onClickRow" ref="table">
        <slot />
      </me-table>
    </template>
  </me-combo-select>
</template>

<script>
import ComboMixin from '../combo.mixin'
export default {
  mixins: [ComboMixin],
  name: 'MeComboTable',
  props: { placeholder:String },
  watch: {
    value(value) { this.value__ = [...value] }
  },
  created() {
    this.value__ = [...(this.value || [])]
  },
  methods: {
    onClickRow(row, index) {
      this.$refs.combo.onClickOption(row, index)
      this.$emit('change', this.multiple ? [...this.value__] : this.value__)
    }
  }
}
</script>
