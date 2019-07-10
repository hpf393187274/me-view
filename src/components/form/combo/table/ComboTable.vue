<template>
  <me-combo-select :clearable="clearable" :data="data" :disabled="disabled" :placeholder="placeholder">
    <template #options>
      <me-table :checkbox="checkbox" :data="data">
        <me-table-column field="value" label="值2" />
        <me-table-column field="label" label="标签" />
      </me-table>
    </template>
  </me-combo-select>
</template>

<script>
export default {
  name: 'MeComboTable',
  props: {
    data: { type: Array, default() { return [] } }
  }
}
</script>
