<template>
  <div class="me-column table-header">
    <me-table-row type="header" :columns="columns"/>
  </div>
</template>
<script>
import TableRow from './TableRow'
export default {
  name: 'MeTableHeader',
  components: {
    [TableRow.name]: TableRow
  },
  props: {
    field: { type: String, default: '' },
    columns: { type: Array, default: () => ([]) }
  }
}
</script>
