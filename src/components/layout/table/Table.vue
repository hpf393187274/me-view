<template>
  <div :class="classes">
    <div v-show="false">
      <slot />
    </div>
    <template v-if="$slots.header">
      <div class="me-row table-toolbar">
        <slot name="header" />
      </div>
    </template>
    <me-line-h />
    <me-table-row-header
      :center="center"
      :checkbox="checkbox"
      :checked-half="checkedHalf"
      :checked.sync="checkedHeader"
      :columns="columns__"
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
        :columns="columns__"
        :data="item"
        :highlight="highlight"
        :key="item.primaryKey"
        :primary-key="item.primaryKey"
        :width="width__"
        @click-column="onColumn"
        @click-row="onRow"
        v-for="item in data"
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
let idSeed = 1
export default {
  name: 'MeTable',
  components: {
    [TableRowHeader.name]: TableRowHeader,
    [TableRowBody.name]: TableRowBody
  },
  props: {
    field: { type: String, default: '' },
    data: { type: Array, default: () => [] },
    highlight: Boolean
  },
  computed: {
    classes() {
      return [
        'me-column me-table', { 'me-table-border': this.border }
      ]
    },
    styleBody() {
      return { width: `calc( 100% - 20px )` }
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
  data() {
    return {
      id__: '',
      columns__: [],
      checkedHeader: this.checked,
      checkedBody: this.checked,
      checkedHalf: false,
      checkedBodyNumber: 0,
      checkedRows: [],
      selectedNodeOld: null,
      selectedData: null,
      width__: '100%'
    }
  },
  created() {
    this.id__ = `me-table_${idSeed++}`
    this.initPrimaryKey(this.data)
    this.checkedBodyNumber = this.checked ? this.length : 0
  },
  mounted() {
    this.$nextTick(() => {
      this.width__ = this.$el.offsetWidth
    })
  },
  methods: {
    /**
     * 追加：选中的行
     */
    appendCheckedRows(target) {
      const primaryValue = Reflect.get(target, this.primaryKey)
      const index = this.checkedRows.findIndex(item => primaryValue === Reflect.get(item, this.primaryKey))
      index === -1 && this.checkedRows.push(target)
    },
    /**
     * 移除：选中的行
     */
    removeCheckedRows(target) {
      const primaryValue = Reflect.get(target, this.primaryKey)
      this.$tools.arrayRemove(this.checkedRows, item => primaryValue === Reflect.get(item, this.primaryKey))
    },
    /**
     * 点击 Header row checkbox
     */
    handlerCheckboxHeader(value) {
      this.checkedHalf = false
      this.checkedBody = value
      this.checkedBodyNumber = value ? this.length : 0
      this.$tools.clearEmpty(this.checkedRows)
      value && this.checkedRows.push(...this.data)
    },
    /**
     * 如果单选，则记录选择的节点，并清除上一次选择
     */
    handleCheckedSingleNode(data, node) {
      if (this.$type.isObject(this.selectedNodeOld)) {
        if (this.selectedNodeOld !== node) {
          this.selectedNodeOld.setChecked(false)
        }
      }
      this.selectedNodeOld = node
      this.selectedData = data
    },
    /**
     * 点击 Row
     */
    onRow(checked, row, index, node) {
      if (this.multiple) {
        this.checkedBodyNumber += checked ? 1 : -1
        checked ? this.appendCheckedRows(row) : this.removeCheckedRows(row)
      } else {
        this.checkedBodyNumber = checked ? 1 : 0
        this.handleCheckedSingleNode(row, node)
      }
      this.$emit('click-row', row, index, node)
    },
    /**
     * 点击 Column
     */
    onColumn(...value) {
      this.$emit('click-column', ...value)
    }
  }
}
</script>
