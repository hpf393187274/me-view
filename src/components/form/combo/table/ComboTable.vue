<template>
  <me-combo-select
    :clearable="clearable"
    :data="data"
    :disabled="disabled"
    :field-label="fieldLabel"
    :field-value="fieldValue"
    :height="height"
    :highlight="highlight"
    :multiple="multiple"
    :placeholder="placeholder"
    :readonly="readonly"
    ref="combo"
    v-model="value__"
  >
    <template>
      <me-table :border="border" :columns="columns" :data="data" :highlight="highlight" :multiple="multiple" @click-row="onClickRow">
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
  props: {
    columns: { type: Array, default: () => [] },
  },
  watch: {
    value(value) { this.value__ = value }
  },
  created() {
    this.value__ = this.value
  },
  methods: {
    onClickRow(row, index) {
      this.$refs.combo.onClickOption(row, index)
      this.$emit('change', this.multiple ? [...this.value__] : this.value__)
    }
  }
}
</script>
