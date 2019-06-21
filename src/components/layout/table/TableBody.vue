<template>
  <div class="me-cloumn table-body">
    <template v-for="item in data">
      <me-table-row
        :class="{'selected': activate === item[nodeKey]}"
        :columns="columns"
        :data="item"
        :key="item[nodeKey]"
        @click="activate = item[nodeKey]"
      />
      <div :key="item[nodeKey]" class="me-border" style="height:100px;">ssss</div>
    </template>
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
