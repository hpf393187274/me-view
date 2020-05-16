<template>
  <div :style="styleContainer" class="me-table-container me-column">
    <template v-if="$slots.header">
      <div class="me-row table-toolbar" v-if="$slots.header">
        <slot name="header" />
      </div>
    </template>
    <div class="me-flex table-wrapper" v-show="show">
      <me-table-header :scroll-left="scrollLeft" :style="styleTHead">
        <me-table-row
          :center="center"
          :checkbox="checkbox"
          :checked="checkedHeader"
          :checked-half="checkedHeaderHalf"
          :columns="columns__"
          :data-length="data.length"
          :multiple="multiple"
          @checked-change="handlerCheckboxHeader"
          header
        />
      </me-table-header>
      <me-table-body @scroll-render-v="handlerDifference" @scroll-body="handlerScrollBody" class="me-flex" ref="tableBody">
        <me-table-row
          :center="center"
          :checkbox="checkbox"
          :columns="columns__"
          :node="item"
          :highlight="highlight"
          :index="index"
          :key="getPrimaryValue(item.data) || index"
          :multiple="multiple"
          :primary-field = "primaryField"
          v-for="(item,index) in nodeList"
        />
      </me-table-body>
    </div>
    <template v-if="$slots.footer">
      <div class="me-row table-toolbar" v-if="$slots.footer">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>
<script>
import Tools from 'me-view/src/script/tools'
import Type from 'me-view/src/script/type'
import TableRow from './TableRow.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import emitter from 'me-view/src/mixins/emitter'
// import Node from './Node'
let idSeed = 1
export default {
  name: 'MeTable',
  mixins: [ emitter ],
  components: {
    [TableRow.name]: TableRow,
    [TableHeader.name]: TableHeader,
    [TableBody.name]: TableBody
  },
  props: {
    field: { type: String, default: '' },
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    checked: { type: Boolean, default: false },
    primaryField: { type: String, default: 'id' },
    center: Boolean,
    checkbox: Boolean,
    height: [ Number, String ],
    multiple: Boolean,
    width: [ Number, String ],
    highlight: Boolean
  },
  computed: {
    styleContainer () {
      return {
        width: Type.isNumber(this.width) ? `${this.width}px` : this.width,
        height: Type.isNumber(this.height) ? `${this.height}px` : this.height
      }
    },
    styleTHead () {
      return { 'padding-right': `${this.difference}px` }
    },
    length () {
      return Type.isArray(this.nodeList) ? this.nodeList.length : 0
    },
    checkedNumber () { return Object.keys(this.checkedData).length }
  },
  watch: {
    data (newValue, oldValue) {
      console.debug('Table.watch -> data is change begin ......')
      this.initData(newValue)
    },
    checkedNumber (value) {
      if (this.length === 0 || value === 0) {
        this.checkedHeader = this.checkedHeaderHalf = false
        return
      }
      this.checkedHeader = this.length === value
      this.checkedHeaderHalf = this.length !== value
    }
  },
  data () {
    return {
      id__: '',
      columns__: [],
      checkedHeader: this.checked,
      checkedHeaderHalf: false,
      checkedData: {},
      nodeList: [],
      difference: 0,
      selectedNodeOld: null,
      scrollLeft: 0,
      show: true
    }
  },
  created () {
    this.id__ = `me-table_${idSeed++}`
    this.initData(this.data)
    this.listener('MeTable-row-checked-true', ({ key, value }) => this.$set(this.checkedData, key, value))
    this.listener('MeTable-row-checked-false', ({ key }) => this.$delete(this.checkedData, key))
    this.listener('MeTable-row-sort', ({ field, order }) => this.sort(field, order))
  },
  async mounted () {
    await this.$nextTick()
    this.handlerSlots()
  },
  methods: {
    append (...list) {
      if (Type.isArray(list)) {
        for (const item of list) {
          this.nodeList.push({ data: item, checked: false, component: null })
        }
      }
    },
    initData (data = []) {
      this.nodeList = []
      this.handlerCheckboxHeader(false)
      this.append(...data)
    },
    sort (field, order = Tools.ASC) {
      Tools.sort(this.nodeList, item => Reflect.get(item.data, field), order)
    },
    handlerDifference ({ status, size }) {
      this.difference = status ? size : 0
    },
    clear () { this.checkedData = {} },
    removeRows (data = []) {
      Tools.forEach(data, item => {
        const primaryValue = this.getPrimaryValue(data)
        Reflect.deleteProperty(this.checkedData, primaryValue)
        Tools.arrayRemove(this.nodeList, target => this.getPrimaryValue(target.data) === primaryValue)
      })
    },
    getPrimaryValue (target) {
      return Reflect.get(target, this.primaryField)
    },
    getCheckedRows () {
      const values = Object.values(this.checkedData)
      return values && values.map(item => item.data)
    },
    cancelChecked () {
      this.checkedData.forEach(row => row.handlerCheckedChange(false))
    },
    /**
     * 设置选中的数据
     * @param {Array} data 数据
     * @param {Boolean} clear 是否清楚原有选择数据，默认不清楚
     */
    setCheckedRows (data = [], clear) {
      console.debug('Table.setCheckedRows -> begin......')
      clear && this.cancelChecked()
      Tools.forEach(data, item => {
        const uniqueValue = this.getPrimaryValue(item)
        const node = this.nodeList.find(item => uniqueValue === item.uniqueValue)
        if (node && node.component) {
          node.component.handlerCheckedChange(true)
        }
      })
    },
    /**
     * 点击 Header row checkbox
     */
    handlerCheckboxHeader (status) {
      console.debug(`table.header.checked = ${status}`)
      this.checkedHeaderHalf = false
      this.clear()
      this.nodeList.forEach(({ component }) => { component.handlerCheckedChange(status) })
    },
    handlerScrollBody (scrollLeft) {
      this.scrollLeft = scrollLeft
    },
    handlerSlots () {
      const excludeSlots = [ 'header', 'footer', 'default' ]
      const slotKeys = Reflect.ownKeys(this.$scopedSlots)
      this.columns__ = [ ...this.columns ]
      if (Type.isArray(slotKeys) && slotKeys.length > 0) {
        const newSlotKeys = slotKeys.filter(item => !(item.includes('$') || excludeSlots.includes(item)))
        if (Type.isArray(newSlotKeys) && newSlotKeys.length > 0) {
          console.debug('table.handlerSlots --> newSlotKeys = ', newSlotKeys)
          for (const column of this.columns__) {
            if (newSlotKeys.includes(column.field)) {
              const extended = Reflect.get(this.$scopedSlots, column.field)
              Reflect.set(column, 'extended', extended)
            }
          }
        }
      }
    }
  }
}
</script>
