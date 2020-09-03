<template>
  <tr :class="classes" @click.stop="handlerRow(!checked__)">
    <template v-if="header">
      <table-cell-header width="50px" layout="center" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click="handlerCheckedChange(!checked__)" v-model="checked__" />
      </table-cell-header>
      <table-cell-header width="50px" layout="center" v-if="hasIndex">序号</table-cell-header>
      <table-cell-header :key="column.label" v-bind="column" v-for="column in columns" />
    </template>
    <template v-else>
      <table-cell-d width="50px" layout="center" v-if="checkbox">
        <me-checkbox :disabled="multiple === false" @click="handlerCheckedChange(!checked__)" v-model="node.checked" />
      </table-cell-d>
      <table-cell-d width="50px" layout="center" v-if="hasIndex">{{index + 1}}</table-cell-d>
      <table-cell-d :data="data" :key="column.field" v-bind="column" v-for="column in columns" />
    </template>
  </tr>
</template>
<script>
import TableCellD from './TableCellD'
import TableCellHeader from './TableCellHeader'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'TableRow',
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
    highlight: Boolean,
    checkedHalf: Boolean,
    fieldValue: String,
    checked: { type: Boolean, default: false },
    checkbox: Boolean,
    multiple: Boolean,
    columns: { type: Array, default: () => [] }
  },
  async mounted () {
    await this.$nextTick()
    if (this.header === false) {
      this.node.uniqueValue = this.uniqueValue
      this.node.component = this
    }
  },
  async updated () {
    await this.$nextTick()
    if (this.header === false) {
      this.node.uniqueValue = this.uniqueValue
      this.node.component = this
    }
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
      return Reflect.get(this.data, this.fieldValue) || this.index
    },
    classes () {
      return [
        { 'is-selected': this.highlight && this.node.checked }
      ]
    }
  },
  methods: {
    handlerRow (checked) {
      if (this.header === false) {
        this.handlerCheckedChange(checked)
        this.dispatchUpward('Table', 'click-row', { data: this.data, index: this.index, node: this })
      }
    },
    handlerCheckedChange (checked) {
      this.checked__ = checked
      console.debug(`Table.row.handlerCheckedChange ->  checked = ${checked}`)
      if (this.header === false) {
        this.node.checked = checked
        this.dispatchUpward('Table', `Table-row-checked-${checked}`, { key: this.uniqueValue, value: this })
      }
      this.$emit('checked-change', checked, this.data, this)
    }
  }
}
</script>
