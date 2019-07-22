<template>
  <me-combo-select
    :clearable="clearable"
    :data="data"
    :disabled="disabled"
    :field-label="fieldLabel"
    :field-value="fieldValue"
    :multiple="multiple"
    :placeholder="placeholder"
    @change-status="onChangeStatus"
    ref="combo"
    v-model="value__"
  >
    <template #options>
      <me-table :border="border" :data="data" :node-key="fieldValue" @click-row="onClickRow" checked-directly ref="table">
        <slot>
          <me-table-column field="value" label="值" />
          <me-table-column field="label" label="标签" />
        </slot>
      </me-table>
    </template>
  </me-combo-select>
</template>

<script>
import ComboMixin from '../combo.mixin'
export default {
  mixins: [ComboMixin],
  name: 'MeComboTable',
  watch: {
    value(value) { this.value__ = [...value] }
  },
  created() {
    this.value__ = [...this.value]
  },
  methods: {
    onClickRow(row, index) {
      this.$refs.combo.clickOption(row, index)
      this.$emit('input', this.multiple ? [...this.value__] : this.value__)
    },
    onChangeStatus(value) {
      if (value) {
        const table = this.$refs.table
        if (table) {
          const header = table.$refs.header
          if (header) {
            window.setTimeout(() => { header.init() }, 0)
          }
        }
      }
    }
  }
}
</script>
