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
    @change-status="onChangeStatus"
    ref="combo"
    v-model="value__"
  >
    <template #options>
      <me-table
        :border="border"
        :data="data"
        :highlight="highlight"
        :node-key="fieldValue"
        @click-row="onClickRow"
        checked-directly
        ref="table"
      >
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
  model: {
    props: 'value', event: 'change'
  },
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
