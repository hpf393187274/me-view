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
        <me-checkbox :disabled="multiple === false" @click="handlerCheckedChange(!checked__)" v-model="node.checked" />
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
    node: {
      type: Object, default () { return { data: null, checked: false } }
    },
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
  mounted () {
    console.debug('Table.Row -> mounted begin ......')
    const $this = this
    this.$nextTick(() => {
      if ($this.header === false) {
        $this.node.uniqueValue = $this.getPrimaryValue()
        $this.node.component = $this
      }
    })
  },
  updated () {
    const $this = this
    this.$nextTick(function () {
      if ($this.header === false) {
        $this.node.uniqueValue = $this.uniqueValue
        $this.node.component = $this
      }
    })
  },
  data () {
    return {
      checked__: this.checked
    }
  },
  watch: {
    checked (value) {
      this.checked__ = value
    }
  },
  computed: {
    data () {
      return this.node.data
    },
    uniqueValue () {
      return Reflect.get(this.data, this.primaryField) || this.index
    },
    classes () {
      return [
        { 'is-selected': this.highlight && this.node.checked }
      ]
    }
  },
  methods: {
    getPrimaryValue () {
      return Reflect.get(this.data, this.primaryField) || this.index
    },
    handlerRow (checked) {
      if (this.header === false) {
        this.handlerCheckedChange(checked)
        this.dispatchUpward('MeTable', 'click-row', { data: this.data, index: this.index, node: this })
      }
    },
    handlerCheckedChange (checked) {
      this.checked__ = checked
      console.debug(`Table.row.handlerCheckedChange ->  checked = ${checked}`)
      if (this.header === false) {
        this.node.checked = checked
        this.dispatchUpward('MeTable', `MeTable-row-checked-${checked}`, { key: this.node.uniqueValue, value: this })
      }
      this.$emit('checked-change', checked, this.data, this)
    }
  }
}
</script>
