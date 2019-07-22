<template>
  <div :class="classes">
    {{checkedDirectly}}
    <template v-if="$slots.header">
      <div class="me-row table-toolbar">
        <slot name="header" />
      </div>
      <me-line-h />
    </template>
    <me-table-row-header
      :center="center"
      :checkbox="checkbox"
      :checked="checkedHeader"
      :checked-half="checkedHalf"
      :columns="columns"
      :multiple="multiple"
      :width="width__"
      @click-checkbox="handlerCheckboxHeader"
      ref="header"
    />
    <div class="table-body" ref="body">
      <me-table-row-body
        :center="center"
        :checkbox="checkbox"
        :checked="checkedBody"
        :checked-directly="checkedDirectly"
        :class="{'row-selected': active === item[nodeKey]}"
        :columns="columns"
        :data="item"
        :index="index"
        :key="item[nodeKey]"
        :width="width__"
        @click-checkbox="onCheckboxBody"
        @click-column="onColumn"
        @click-row="onRow"
        v-for="(item,index) in data"
      />
    </div>
    <div class="me-row table-toolbar" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
import TableRowHeader from './TableRowHeader.vue'
import TableRowBody from './TableRowBody.vue'
export default {
  name: 'MeTable',
  components: {
    [TableRowHeader.name]: TableRowHeader,
    [TableRowBody.name]: TableRowBody
  },
  props: {
    nodeKey: { type: String, default: 'id' },
    field: { type: String, default: '' },
    data: { type: Array, default: () => [] }
  },
  computed: {
    classes() {
      return [
        'me-column me-table',
        { 'me-table-border': this.border }
      ]
    },
    styleBody() {
      // hasScrollbar
      return {
        width: `calc( 100% - 20px )`
      }
    },
    length() {
      return this.$type.isArray(this.data) ? this.data.length : 0
    }
  },
  watch: {
    checkedBodyNumber(value) {
      if (this.length === 0 || value === 0) {
        this.checkedHeader = this.checkedHalf = false
        return
      }
      this.checkedHeader = this.length === value
      this.checkedHalf = this.length !== value
    }
  },
  created() {
    this.checkedBodyNumber = this.checked ? this.length : 0
  },
  data() {
    return {
      active: '',
      columns: [],
      checkedHeader: this.checked,
      checkedBody: this.checked,
      checkedHalf: false,
      checkedBodyNumber: 0,
      checkedRows: [],
      checkedSingleNode: null,
      checkedSingleRow: null,
      width__: '100%'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.columns = this.parseColumns()
      this.width__ = this.$el.offsetWidth
    })
  },
  methods: {
    /**
     * 追加：选中的行
     */
    appendCheckedRows(target) {
      const index = this.checkedRows.findIndex(item => target[this.nodeKey] === item[this.nodeKey])
      index === -1 && this.checkedRows.push(target)
    },
    /**
     * 移除：选中的行
     */
    removeCheckedRows(target) {
      this.$tools.arrayRemove(this.checkedRows, item => target[this.nodeKey] === item[this.nodeKey])
    },
    /**
     * 点击 Header row checkbox
     */
    handlerCheckboxHeader(value) {
      this.checkedHalf = false
      this.checkedHeader = this.checkedBody = value
      this.checkedBodyNumber = value ? this.length : 0

      this.$tools.clearEmpty(this.checkedRows)
      value && this.checkedRows.push(...this.data)
    },
    /**
     * 如果单选，则记录选择的节点，并清除上一次选择
     */
    handleCheckedSingleNode(data, node) {
      if (this.checkedSingleNode !== null) {
        this.checkedSingleNode.setChecked(false)
      }
      this.checkedSingleNode = node
      this.checkedSingleRow = data
    },
    /**
     * 点击 Body Row checkbox
     */
    onCheckboxBody(value, row, index, node) {
      if (this.multiple) {
        this.checkedBodyNumber += value ? 1 : -1
        value ? this.appendCheckedRows(row) : this.removeCheckedRows(row)
      } else {
        this.checkedBodyNumber = value ? 1 : 0
        this.handleCheckedSingleNode(row, node)
      }
      this.$emit('click-checkbox', value, row, index, node)
    },
    /**
     * 点击 Row
     */
    onRow(row, index, node) {
      this.active = row[this.nodeKey]
      this.$emit('click-row', row, index, node)
    },
    /**
     * 点击 Column
     */
    onColumn(...value) {
      this.$emit('click-column', ...value)
    },
    getColumns() {
      if (this.$type.isNotArray(this.$slots.default)) { return [] }
      return this.$slots.default.filter(vnode => {
        return vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'MeTableColumn'
      })
    },
    parseColumns() {
      return this.getColumns().flatMap(vnode => {
        return vnode.componentOptions.propsData
      })
    }
  }
}
</script>
