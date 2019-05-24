<template>
  <div class="me-cloumn table-body">
    <me-table-row
      v-for="item in data"
      :key="item[nodeKey]"
      :columns="columns"
      :data="item"
      :class="{'selected': activate === item[nodeKey]}"
      @click="activate = item[nodeKey]"
    />
  </div>
</template>
<script>
import TableRow from './TableRow'
export default {
  name: 'MeTableBody',
  components: {
    [TableRow.name]: TableRow
  },
  props: {
    nodeKey: { type: String, default: 'id' },
    columns: { type: Array, default: () => ([]) },
    data: { type: Array, default: () => ([]) }
  },
  data() {
    return {
      activate: 0
    }
  }
}
</script>
