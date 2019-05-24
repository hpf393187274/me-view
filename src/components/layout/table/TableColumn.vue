<template>
  <div>MeTableColumn</div>
</template>
<script>
export default {
  name: 'MeTableColumn',
  props: {
    field: { type: String, default: '' },
    data: { type: Object, default: () => ({}) }
  }
}
</script>
