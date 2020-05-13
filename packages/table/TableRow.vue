<template>
  <tr :class="classes" @click.stop="handlerRow(!checked__)">
    <template v-if="header">
      <me-table-cell-header class="content-center" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click="handlerCheckedChange(!checked__)" v-model="checked__" />
      </me-table-cell-header>
      <me-table-cell-header class="content-center" v-if="hasIndex">序号</me-table-cell-header>
      <me-table-cell-header :key="column.label" v-bind="column" v-for="column in columns" />
    </template>
    <template v-else>
      <me-table-cell-d class="content-center" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click="handlerCheckedChange(!checked__)" v-model="checked__" />
      </me-table-cell-d>
      <me-table-cell-d class="content-center" v-if="hasIndex">{{index + 1}}</me-table-cell-d>
      <me-table-cell-d :data="data" :key="column.field" v-bind="column" v-for="column in columns" />
    </template>
  </tr>
</template>
<script>
import TableCellD from './TableCellD'
import TableCellHeader from './TableCellHeader'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'MeTableRow',
  mixins: [ emitter ],
  components: {
    [TableCellD.name]: TableCellD,
    [TableCellHeader.name]: TableCellHeader
  },
  props: {
    index: Number,
    hasIndex: Boolean,
    header: { type: Boolean, default: false },
    data: { type: Object, default: () => ({}) },
    renderMethod: Function,
    highlight: Boolean,
    checkedHalf: Boolean,
    primaryField: String,
    primaryKey: String,
    checked: { type: Boolean, default: false },
    checkbox: Boolean,
    dataLength: Number,
    multiple: Boolean,
    columns: { type: Array, default: () => [] }
  },
  data () {
    return {
      checked__: this.checked
    }
  },
  created () {
    if (this.header === false) {
      this.dispatchUpward('MeTable', 'table-row-all-append', { key: this.getPrimaryValue(), value: this })
    }
  },
  watch: {
    checked (value) { this.checked__ = value }
  },
  computed: {
    classes () {
      return [
        { 'is-selected': this.highlight && this.checked__ }
      ]
    }
  },
  beforeDestroy () {
    if (this.header === false) {
      this.dispatchUpward('MeTable', 'table-row-all-remove', { key: this.getPrimaryValue(), value: this })
    }
  },
  methods: {
    getPrimaryValue () {
      return Reflect.get(this.data, this.primaryField) || this.index
    },
    handlerRow (checked) {
      if (this.header === false) {
        this.handlerCheckedChange(checked)
        this.dispatchUpward('MeTable', 'click-row', { data: this.data, index: this.index, row: this })
      }
    },
    handlerCheckedChange (checked) {
      console.debug(`tab.row.checkbox checked = ${checked}`)
      this.checked__ = checked
      if (this.header === false) {
        this.dispatchUpward('MeTable', `table-row-checked-${checked}`, { key: this.getPrimaryValue(), value: this })
      }
      this.$emit('checked-change', checked, this.data, this)
    }
  }
}
</script>
