<template>
  <div :style="styleContainer" class="me-column me-table-container">
    <template v-if="$slots.header">
      <div class="me-row table-toolbar" v-if="$slots.header">
        <slot name="header" />
      </div>
    </template>
    <div class="me-column me-flex table-wrapper" v-show="show">
      <me-table-header :scroll-left="scrollLeft" :style="styleTHead">
        <me-table-row
          :center="center"
          :checkbox="checkbox"
          :checked="checkedHeader"
          :checked-half="checkedHalf"
          :columns="columns__"
          :data-length="data.length"
          :multiple="multiple"
          @click-checkbox="handlerCheckboxHeader"
          header
        />
      </me-table-header>

      <me-table-body @scroll-body="onScrollBody" class="me-flex" ref="tableBody">
        <me-table-row
          :center="center"
          :checkbox="checkbox"
          :checked="checkedBody"
          :columns="columns__"
          :data="item"
          :highlight="highlight"
          :index="index"
          :key="index"
          :multiple="multiple"
          @click-row="onRow"
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
const scrollbarWidth = +function () {
  var scrollDiv = document.createElement("div");
  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}()

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
    center: Boolean,
    checkbox: Boolean,
    height: [Number, String],
    multiple: Boolean,
    width: [Number, String],
    highlight: Boolean
  },
  computed: {
    styleContainer() {
      return {
        'width': this.$type.isNumber(this.width) ? `${this.width}px` : this.width,
        'height': this.$type.isNumber(this.height) ? `${this.height}px` : this.height
      }
    },
    styleTHead() {
      if (this.scrollbarHas) {
        return { width: `calc( 100% - ${this.scrollbarWidth}px )` }
      }
      return {}
    },
    length() {
      return this.$type.isArray(this.data) ? this.data.length : 0
    }
  },
  watch: {
    checkedBodyNumber(value) {
      if (this.length === 0 || value === 0) {
        console.log('checkedBodyNumber ------------------')
        this.checkedHeader = this.checkedHalf = false
        return
      }
      console.log('checkedBodyNumber ===========================')
      this.checkedHeader = this.length === value
      this.checkedHalf = this.length !== value
    },
    length() {
      this.$nextTick(() => {
        this.existScrollbar()
      })
    }
  },
  data() {
    return {
      id__: '',
      columns__: [],
      scrollbarWidth: scrollbarWidth, checkedHeader: this.checked,
      scrollbarHas: false,
      checkedBody: this.checked,
      checkedHalf: false,
      checkedBodyNumber: 0,
      checkedRows: [],
      selectedNodeOld: null,
      selectedData: null,
      scrollLeft: 0,
      show: true,
    }
  },
  created() {
    this.id__ = `me-table_${idSeed++}`
    this.initPrimaryKey(this.data)
    this.checkedBodyNumber = this.checked ? this.length : 0
    // setTimeout(() => {
    //   this.show = true
    // }, 3000)
  },
  beforeUpdate() {
    const _this = this
    this.$nextTick(() => {
      window.onload = function () {
        _this.existScrollbar()
      }
    })
  },
  mounted() {
    console.log('mounted')
    this.handlerSlots()
    const _this = this
    this.$nextTick(() => {
      window.onload = function () {
        _this.existScrollbar()
      }
    })
  },
  methods: {
    /**
     * 追加：选中的行
     */
    appendCheckedRows(target) {
      const primaryValue = Reflect.get(target, 'primaryKey')
      const index = this.checkedRows.findIndex(item => primaryValue === Reflect.get(item, 'primaryKey'))
      index === -1 && this.checkedRows.push(target)
    },
    /**
     * 移除：选中的行
     */
    removeCheckedRows(target) {
      const primaryValue = Reflect.get(target, 'primaryKey')
      this.$tools.arrayRemove(this.checkedRows, item => primaryValue === Reflect.get(item, 'primaryKey'))
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
    },
    existScrollbar() {
      const target = this.$refs.tableBody.$el
      this.scrollbarHas = target.scrollHeight > (target.innerHeight || target.clientHeight)
      return target.scrollHeight > (target.innerHeight || target.clientHeight);
    },
    onScrollBody(scrollLeft) {
      this.scrollLeft = scrollLeft
    },
    handlerSlots() {
      const excludeSlots = ['header', 'footer']
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
