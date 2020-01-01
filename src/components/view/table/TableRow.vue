<template>
  <tr :class="clesses" @click.stop="handlerRow">
    <template v-if="header">
      <me-table-cell-h class="checkbox" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click="handlerClickCheckbox" v-model="checked__" />
      </me-table-cell-h>
      <me-table-cell-h :key="column.label" :label="column.label" :width="column.width" v-for="column in columns" />
    </template>
    <template v-else>
      <me-table-cell-d class="checkbox" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click="handlerClickCheckbox" v-model="checked__" />
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
    header: { type: Boolean, default: false },
    data: { type: Object, default: () => ({}) },
    renderMethod: Function,
    highlight: Boolean,
    checkedHalf: Boolean,
    checked: { type: Boolean, default: false },
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
  created() {
    this.initPrimaryKey(this.data)
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
  mounted() {
    if (this.header !== true) {
      this.listenerUpward('MeTable', 'header-checked-change', value => {
        this.checked__ = value
      })
    }
  },
  methods: {
    setChecked(value) {
      this.checked__ = value
    },
    handlerRow() {
      this.handlerCheckedChange()
      if (this.header === false) {
        this.$emit('click-row', this.data, this.index, this)
      }
    },
    handlerClickCheckbox() {
      this.handlerCheckedChange()
      this.$emit('click-checkbox', this.data, this.index, this)
    },
    handlerCheckedChange() {
      console.log('===================', this.checked__ === true ? false : true)
      this.checked__ = this.checked__ === true ? false : true

      this.$emit('checked-change', this.checked__, this.data, this)
    }
  }
}
</script>
