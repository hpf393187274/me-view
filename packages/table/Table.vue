<template>
  <div :style="styleContainer" class="me-table me-flex me-column">
    <template v-if="$slots.header">
      <div class="me-row table-toolbar" v-if="$slots.header">
        <slot name="header" />
      </div>
    </template>
    <div class="me-flex table-wrapper">
      <me-table-header :style="styleTHead">
        <me-table-row
          :checkbox="checkbox"
          :has-index="hasIndex"
          :checked="checkedHeader"
          :checked-half="checkedHeaderHalf"
          :columns="columns__"
          :data-length="length"
          :multiple="multiple"
          @checked-change="handlerCheckboxHeader"
          header
        />
      </me-table-header>
      <template v-if="length > 0">
        <me-table-body class="me-flex" ref="tableBody">
          <me-table-row
            :checkbox="checkbox"
            :columns="columns__"
            :node="item"
            :has-index="hasIndex"
            :highlight="highlight"
            :index="index"
            :key="uniqueValue(item.data) || index"
            :multiple="multiple"
            :field-value = "fieldValue"
            v-for="(item,index) in nodeList"
          />
        </me-table-body>
      </template>
      <div class="me-empty me-border" v-else>暂无数据</div>
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
export default {
  name: 'MeTable',
  mixins: [ emitter ],
  components: {
    [TableRow.name]: TableRow,
    [TableHeader.name]: TableHeader,
    [TableBody.name]: TableBody
  },
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    checked: { type: Boolean, default: false },
    fieldValue: { type: String, default: 'id' },
    hasIndex: Boolean,
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
        height: Type.isNumber(this.height__) ? `${this.height__}px` : this.height__
      }
    },
    styleTHead () {
      if (this.hasScrollBar) {
        return { 'padding-right': `${this.scrollBarWidth}px` }
      }
      return { }
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
      columns__: [],
      checkedHeader: this.checked,
      checkedHeaderHalf: false,
      checkedData: {},
      nodeList: [],
      scrollBarWidth: 0,
      hasScrollBar: false,
      height__: this.height
    }
  },
  created () {
    this.initData(this.data)
    this.listener('MeTable-row-checked-true', ({ key, value }) => this.$set(this.checkedData, key, value))
    this.listener('MeTable-row-checked-false', ({ key }) => this.$delete(this.checkedData, key))
    this.listener('MeTable-row-sort', ({ field, order }) => this.sort(field, order))
    this.listener('MeTable--scrollBar', flag => { this.hasScrollBar = flag })

    this.listenerUpward([ 'MeDialog', 'MeCombo' ], 'me-attribute--visible-true', () => this.layout())
    this.listenerUpward([ 'MeDialog' ], 'me-dialog--visible-frist', () => {
      this.dialogInit && this.dialogInit()
    })

    this.scrollBarWidth = Tools.scrollBarWidth()
  },
  async mounted () {
    await this.$nextTick()
    this.computeHeight()
    this.handlerSlots()
  },
  methods: {
    computeHeight () {
      if (this.existParentComponent([ 'MeDialog' ])) { return }
      if (Tools.isEmpty(this.height__) || this.height__ === 0) {
        this.height__ = this.$el.getBoundingClientRect().height
      }
    },
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
      this.layout()
    },
    sort (field, order = Tools.ASC) {
      Tools.sort(this.nodeList, item => Reflect.get(item.data, field), order)
    },
    clear () { this.checkedData = {} },
    removeRows (data = []) {
      Tools.forEach(data, item => {
        const uniqueValue = this.uniqueValue(data)
        Reflect.deleteProperty(this.checkedData, uniqueValue)
        Tools.arrayRemove(this.nodeList, target => this.uniqueValue(target.data) === uniqueValue)
      })
    },
    uniqueValue (data = {}) { return Reflect.get(data, this.fieldValue) },
    getCheckedRows () {
      const values = Object.values(this.checkedData)
      return values && values.map(item => item.data)
    },
    cancelChecked () {
      this.checkedData.forEach(row => row.handlerCheckedChange(false))
    },
    async layout () {
      await this.$nextTick()
      const tableBody = this.$refs.tableBody
      tableBody && tableBody.monitorScrollBar()
      this.computeHeight()
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
        const uniqueValue = this.uniqueValue(item)
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
