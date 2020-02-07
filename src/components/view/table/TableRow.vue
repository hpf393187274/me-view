<template>
  <tr :class="clesses" @click.stop="handlerRow(!checked__)">
    <template v-if="header">
      <me-table-cell-h class="content-center" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click="handlerCheckedChange(!checked__)" v-model="checked__" />
      </me-table-cell-h>
      <me-table-cell-h class="content-center" v-if="hasIndex">序号</me-table-cell-h>
      <me-table-cell-h :key="column.label" :label="column.label" :width="column.width" v-for="column in columns" />
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
    if (this.header !== true) {
      if (this.primaryField) {
        this.initPrimaryValue()
      }
      this.dispatchUpward('MeTable', 'table-row-all-append', { key: this.getPrimaryValue(), value: this })
    }
  },
  watch: {
    checked (value) { this.checked__ = value }
  },
  computed: {
    clesses () {
      return [
        { 'is-selected': this.highlight && this.checked__ }
      ]
    },
    classColumn () {
      return [
        'me-row table-column',
        {
          'me-flex': this.columns.findIndex(item => this.$tools.isNotEmpty(item.width)) === -1,
          'me-center': this.center
        }
      ]
    }
  },
  beforeDestroy () {
    this.dispatchUpward('MeTable', 'table-row-all-remove', { key: this.getPrimaryValue(), value: this })
  },
  methods: {
    initPrimaryValue () {
      const primaryValue = Reflect.get(this.data, this.primaryField)
      if (primaryValue) {
        Reflect.set(this.data, 'primarykey', primaryValue)
      }
    },
    getPrimaryValue () {
      return Reflect.get(this.data, 'primarykey')
    },
    handlerRow (checked) {
      this.handlerCheckedChange(checked)
      if (this.header === false) {
        this.$emit('click-row', this.data, this.index, this)
      }
    },
    handlerCheckedChange (checked) {
      this.checked__ = checked
      this.dispatchUpward('MeTable', `table-row-checked-${checked}`, { key: this.getPrimaryValue(), value: this })
      this.$emit('checked-change', checked, this.data, this)
    }
  }
}
</script>
