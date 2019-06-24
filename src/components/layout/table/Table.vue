<template>
  <div :class="classes">
    <me-table-row-header
      :center="center"
      :checkbox="checkbox"
      :checked="checkedHeader"
      :checked-half="checkedHalf"
      :columns="columns"
      @click-checkbox="handlerCheckboxHeader"
    />
    {{selectedChecked}}
    <div class="me-cloumn table-body">
      <me-table-row-body
        :center="center"
        :checkbox="checkbox"
        :checked="checkedBody"
        :checked-selected="checkedSelected"
        :class="{'row-selected': !selectedChecked && active === item[nodeKey]}"
        :columns="columns"
        :data="item"
        :index="index"
        :key="item[nodeKey]"
        :selected-checked="selectedChecked"
        @click-checkbox="handlerCheckboxBody"
        @click-column="handlerColumn"
        @click-row="handlerRow"
        v-for="(item,index) in data"
      />
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
    selectedChecked: Boolean,
    checkedSelected: Boolean,
    data: { type: Array, default: () => [] }
  },
  computed: {
    classes() {
      return [
        'me-column me-table',
        { 'me-table-border': this.border }
      ]
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
      checkedBodyNumber: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.columns = this.parseColumns()
    })
  },
  methods: {
    handlerCheckboxHeader(value) {
      this.checkedHeader = this.checkedBody = value
      this.checkedBodyNumber = value ? this.length : 0
    },
    handlerCheckboxBody(value) {
      this.checkedBodyNumber += value ? 1 : -1
    },
    handlerRow(row, index) {
      this.active = row[this.nodeKey]
      this.$emit('click-checkbox', row, index)
    },
    handlerColumn(value) {
      this.$emit('click-checkbox', value)
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
