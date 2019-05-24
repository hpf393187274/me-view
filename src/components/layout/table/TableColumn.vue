<template>
  <div>MeTableColumn</div>
</template>
<script>
export default {
  name: 'MeTableColumn',
  props: {
    columnStyle: { type: String, default: '' },
    field: { type: String, default: '' },
    data: { type: Object, default: () => ({}) }
  }
}
</script>
