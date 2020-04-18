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
          :data="item"
          :highlight="highlight"
          :index="index"
          :key="getPrimaryValue(data) || index"
          :multiple="multiple"
          :primary-field = "primaryField"
          v-for="(item,index) in data"
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
import tools from 'me-view/src/script/Tools.class'
import type from 'me-view/src/script/Type.class'
import TableRow from './TableRow.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import emitter from 'me-view/src/mixins/emitter'
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
        width: type.isNumber(this.width) ? `${this.width}px` : this.width,
        height: type.isNumber(this.height) ? `${this.height}px` : this.height
      }
    },
    styleTHead () {
      return { 'padding-right': `${this.difference}px` }
    },
    length () {
      return type.isArray(this.data) ? this.data.length : 0
    }
  },
  watch: {
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
      checkedRows: new Map(),
      allRows: new Map(),
      checkedNumber: 0,
      difference: 0,
      selectedNodeOld: null,
      scrollLeft: 0,
      show: true
    }
  },
  created () {
    this.id__ = `me-table_${idSeed++}`
    this.initAllRows()

    this.listener('me-table-sort', ({ field, order }) => {
      this.sort(field, order)
    })
  },
  async mounted () {
    await this.$nextTick()
    this.handlerSlots()
  },
  methods: {
    sort (field, order) {
      this.data.sort((a, b) => {
        const valueA = Reflect.get(a, field)
        const valueB = Reflect.get(b, field)
        return order === 'ASC' ? valueA - valueB : valueB - valueA
      })
    },
    initAllRows () {
      this.allRows.clear()
      this.listener('table-row-all-append', ({ key, value }) => this.allRows.set(key, value))
      this.listener('table-row-all-remove', ({ key }) => this.allRows.delete(key))

      this.listener('table-row-checked-true', ({ key, value }) => this.append(key, value))
      this.listener('table-row-checked-false', ({ key }) => this.remove(key))
    },
    handlerDifference ({ status, size }) {
      this.difference = status ? size : 0
    },
    append (key, value, refresh = true) {
      this.checkedRows.set(key, value)
      refresh && this.refresh()
    },
    remove (key, refresh = true) {
      this.checkedRows.delete(key)
      refresh && this.refresh()
    },
    refresh () {
      this.checkedNumber = this.checkedRows.size
    },
    clear () { this.checkedRows.clear() },
    removeRows (data = []) {
      tools.forEach(data, item => {
        tools.arrayRemove(this.data, target => this.getPrimaryValue(target) === this.getPrimaryValue(item))
      })
      this.refresh()
    },
    getPrimaryValue (target) {
      return Reflect.get(target, this.primaryField)
    },
    getCheckedRows () {
      const result = []
      this.checkedRows.forEach(value => result.push(value.data))
      return result
    },
    cancelChecked () {
      this.checkedRows.forEach(row => row.handlerCheckedChange(false))
      this.refresh()
    },
    /**
     * 设置选中的数据
     * @param {Array} data 数据
     * @param {Boolean} clear 是否清楚原有选择数据，默认不清楚
     */
    setCheckedRows (data = [], clear) {
      clear && this.cancelChecked()
      tools.forEach(data, item => {
        const primaryValue = type.isObject(item) ? this.getPrimaryValue(item) : item
        const row = this.allRows.get(primaryValue)
        if (row) {
          row.handlerCheckedChange(true)
        }
      })
      this.refresh()
    },
    /**
     * 点击 Header row checkbox
     */
    handlerCheckboxHeader (status) {
      console.debug(`table.header.checked = ${status}`)
      this.checkedHeaderHalf = false
      this.clear()
      this.allRows.forEach(value => { value.handlerCheckedChange(status) })
      this.refresh()
    },
    handlerScrollBody (scrollLeft) {
      this.scrollLeft = scrollLeft
    },
    handlerSlots () {
      const excludeSlots = [ 'header', 'footer', 'default' ]
      const slotKeys = Reflect.ownKeys(this.$scopedSlots)
      this.columns__ = [ ...this.columns ]
      if (type.isArray(slotKeys) && slotKeys.length > 0) {
        const newSlotKeys = slotKeys.filter(item => !(item.includes('$') || excludeSlots.includes(item)))
        if (type.isArray(newSlotKeys) && newSlotKeys.length > 0) {
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
