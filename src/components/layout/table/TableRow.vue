<template>
  <tr :class="clesses" @click.stop="handlerRow">
    <template v-if="header">
      <me-table-cell-h class="checkbox" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click="onClickCheckbox" v-model="checked__" />
      </me-table-cell-h>
      <me-table-cell-h :key="column.label" :label="column.label" :width="column.width" v-for="column in columns" />
    </template>
    <template v-else>
      <me-table-cell-d class="checkbox" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click="onClickCheckbox" v-model="checked__" />
      </me-table-cell-d>
      <me-table-cell-d :data="data" :key="column.field" v-bind="column" v-for="column in columns" />
    </template>
  </tr>
</template>
<script>
import TableCellH from './TableCellH'
import TableCellD from './TableCellD'
export default {
  name: 'MeTableRow',
  components: {
    [TableCellH.name]: TableCellH,
    [TableCellD.name]: TableCellD
  },
  props: {
    index: Number,
    header: Boolean,
    data: { type: Object, default: () => ({}) },
    renderMethod: Function,
    highlight: Boolean,
    checkedHalf: Boolean,
    checked: Boolean,
    checkbox: Boolean,
    dataLength: Number,
    multiple: Boolean,
    columns: { type: Array, default: () => [] }
  },
  data() {
    return {
      checked__: this.checked
    }
  },
  watch: {
    checked(value) { this.checked__ = value }
  },
  computed: {
    clesses() {
      return [
        { 'is-selected': this.highlight && this.checked__ }
      ]
    },
    classColumn() {
      return [
        'me-row table-column',
        {
          'me-flex': this.columns.findIndex(item => this.$tools.isNotEmpty(item.width)) === -1,
          'me-center': this.center
        }
      ]
    }
  },
  methods: {
    setChecked(value) {
      this.checked__ = value
    },
    handlerRow() {
      if (this.header === false) {
        this.checked__ = this.checked__ === true ? false : true
        this.$emit('click-row', this.checked__, this.data, this.index, this)
      }
    },
    onClickCheckbox(value) {
      this.$emit('click-checkbox', value)
      this.handlerRow()
    }
  }
}
</script>
