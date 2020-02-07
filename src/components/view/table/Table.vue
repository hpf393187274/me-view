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
          :key="index"
          :multiple="multiple"
          @checked-change="handlerCheckedChange"
          @click-row="handlerClickRow"
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
import TableRow from './TableRow.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'

let idSeed = 1
export default {
  name: 'MeTable',
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
    center: Boolean,
    checkbox: Boolean,
    height: [Number, String],
    multiple: Boolean,
    width: [Number, String],
    highlight: Boolean
  },
  computed: {
    styleContainer () {
      return {
        'width': this.$type.isNumber(this.width) ? `${this.width}px` : this.width,
        'height': this.$type.isNumber(this.height) ? `${this.height}px` : this.height
      }
    },
    styleTHead () {
      return { 'padding-right': `${this.difference}px` }
    },
    length () {
      return this.$type.isArray(this.data) ? this.data.length : 0
    }
  },
  watch: {
    checkedBodyNumber (value) {
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
      checkedBodyNumber: 0,
      difference: 0,
      selectedNodeOld: null,
      scrollLeft: 0,
      show: true
    }
  },
  created () {
    this.id__ = `me-table_${idSeed++}`
  },
  async mounted () {
    console.log('mounted')
    this.handlerSlots()
  },
  methods: {
    handlerDifference ({ status, size }) {
      console.log(`handlerDifference -> ${status} --- ${size}`)
      this.difference = status ? size : 0
    },
    getSelectedData () {
      const result = []
      this.checkedRows.forEach(value => {
        result.push(value)
      })
      return result
    },
    /**
     * 点击 Header row checkbox
     */
    handlerCheckboxHeader (value) {
      this.checkedHeaderHalf = false
      this.checkedRows.clear()
      if (value === true) {
        for (const item of this.data) {
          const primaryValue = Reflect.get(item, 'primaryKey')
          this.checkedRows.set(primaryValue, item)
        }
      }
      this.checkedBodyNumber = this.checkedRows.size
      this.$emit('header-checked-change', value)
    },
    handlerCheckedChange (checked, row) {
      if (this.multiple !== true) {
        this.checkedRows.clear()
      }
      const primaryValue = Reflect.get(row, 'primaryKey')
      if (checked === true) {
        this.checkedRows.set(primaryValue, row)
      } else {
        this.checkedRows.delete(primaryValue)
      }
      this.checkedBodyNumber = this.checkedRows.size
    },
    /**
     * 点击 Row
     */
    handlerClickRow (row, index, node) {
      this.$emit('click-row', row, index, node)
    },
    handlerScrollBody (scrollLeft) {
      this.scrollLeft = scrollLeft
    },
    handlerSlots () {
      const excludeSlots = ['header', 'footer', 'default']
      const slotKeys = Reflect.ownKeys(this.$scopedSlots)
      this.columns__ = [...this.columns]
      if (this.$type.isArray(slotKeys) && slotKeys.length > 0) {
        const newSlotKeys = slotKeys.filter(item => !(item.includes('$') || excludeSlots.includes(item)))
        if (this.$type.isArray(newSlotKeys) && newSlotKeys.length > 0) {
          console.log('newSlotKeys = ', newSlotKeys)
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
