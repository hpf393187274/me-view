
<template>
  <td :style="styles">
    <div :class="classes">
      <slot>
        <div v-if="sortable" class="me-row">
          <div class="cell-inner me-row me-center" :title="label">{{label}}</div>
          <div class="cell-sort me-column">
            <me-icon @click="handlerSort('ASC')">icon-order_fill_up</me-icon>
            <me-icon @click="handlerSort('DESC')">icon-order_fill_down</me-icon>
          </div>
        </div>
        <div v-else class="cell-inner" :title="label">{{label}}</div>
      </slot>
    </div>
  </td>
</template>
<script>

import TableCell from './TableCell.mixin'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'TableCellHeader',
  mixins: [ emitter, TableCell ],
  props: {
    sortable: Boolean
  },
  data () {
    return {
      status: 'DESC'
    }
  },
  computed: {
    classes () {
      return [
        'me-row me-cross-center table-cell',
        `me-main-${this.layout}`
      ]
    }
  },
  methods: {
    handlerSort (order) {
      this.dispatchUpward('Table', 'Table-row-sort', { field: this.field, order })
    }
  }
}

</script>
