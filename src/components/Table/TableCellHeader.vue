
<template>
  <td :style="styles">
    <slot>
      <div v-if="sortable" class="me-row">
        <div class="cell-inner" :title="label">{{label}}</div>
        <div class="me-column">
          <me-icon @click="handlerSort('ASC')">icon-order_fill_up</me-icon>
          <me-icon @click="handlerSort('DESC')">icon-order_fill_down</me-icon>
        </div>
      </div>
      <div v-else class="cell-inner" :title="label">{{label}}</div>
    </slot>
  </td>
</template>
<script>

import TableCell from './TableCell.mixin'
import emitter from '../mixins/emitter'
export default {
  name: 'MeTableCellHeader',
  mixins: [ emitter, TableCell ],
  props: {
    sortable: Boolean
  },
  data () {
    return {
      status: 'DESC'
    }
  },
  methods: {
    handlerSort (order) {
      this.dispatchUpward('MeTable', 'me-table-sort', { field: this.field, order })
    }
  }
}

</script>
