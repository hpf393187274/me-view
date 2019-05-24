<template>
  <div class="me-column me-table">
    <div class="table-header">header</div>
    <div class="table-body">body</div>
  </div>
</template>
<script>
export default {
  name: 'MeTable',
  props: {
    checkbox: Boolean,
    field: { type: String, default: '' },
    data: { type: Array, default: () => [] }
  }
}
</script>
