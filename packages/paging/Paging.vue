<template>
  <div class="me-row me-center me-paging">
    <span :class="itemClass()">共 {{total}} 条</span>
    <me-combo-select :align-content="alignContent" slide-direction="down" width="80px" readonly :data="pageSizes" v-model="pageSize__" @change="handlerPageSize" />
    <span class="me-cursor-pointer" :class="itemClass()" @click="setCurrentPage(--currentPage)" title="上一页">
      <template v-if="isBoolean(prevText)">{{prevText}}</template>
      <me-icon v-else title="上一页">icon-angle_left</me-icon>
    </span>
    <div class="me-row me-center me-flex">
      <template v-for="value in visibleLeft">
        <span class="me-cursor-pointer" :class="itemClass(value)" :key="value" @click="setCurrentPage(value)">{{value}}</span>
      </template>
      <me-icon :title="`向前${sizeCenter}页`" @click="setCurrentPage(currentPage - sizeCenter)" v-if="start > minCenter">icon-more</me-icon>
      <template v-for="value in visibleCenter">
        <span class="me-cursor-pointer" :class="itemClass(value)" :key="value" @click="setCurrentPage(value)">{{value}}</span>
      </template>
      <me-icon :title="`向后${sizeCenter}页`" @click="setCurrentPage(currentPage + sizeCenter)" v-if="end < maxCenter">icon-more</me-icon>
      <template v-for="value in visibleRight">
        <span class="me-cursor-pointer" :class="itemClass(value)" :key="value" @click="setCurrentPage(value)">{{value}}</span>
      </template>
    </div>
    <span :class="itemClass()" @click="setCurrentPage(++currentPage)" title="下一页">
      <template v-if="isBoolean(nextText)">{{nextText}}</template>
      <me-icon v-else title="下一页">icon-angle_right</me-icon>
    </span>

    <!-- <span :class="itemClass()" style="min-width:85px;justify-content: flex-end;">{{` 第 ${currentPage} 页 / 共 ${pageNumber} 页 `}}</span> -->
    <span>前往</span>
    <me-input :align-content="alignContent" type="number" width="50px" v-model="currentPage" :rules="rules" @change="setCurrentPage"/>
    <span>页</span>

  </div>
</template>

<script>
import Type from 'me-view/src/script/type'
import common from 'me-view/src/mixins/common'
export default {
  name: 'Paging',
  mixins: [ common ],
  props: {
    value: { type: Number, default: 1 },
    border: Boolean,
    total: { type: Number, default: 0, validator: value => Type.isNumber(value) },
    pageSize: { type: Number, default: 10, validator: value => Type.isNumber(value) && value !== 0 },
    pageSizes: {
      type: Array,
      default () {
        return [
          { value: 10, label: '10' },
          { value: 15, label: '15' },
          { value: 20, label: '20' },
          { value: 30, label: '30' },
          { value: 40, label: '40' },
          { value: 50, label: '50' }
        ]
      }
    },
    prevText: { type: String, default: '' },
    nextText: { type: String, default: '' },
    sizeSide: { type: Number, default: 2 },
    sizeCenter: { type: Number, default: 5 }
  },
  data () {
    return {
      currentPage: this.value,
      pageSize__: this.pageSize,
      alignContent: 'center'
    }
  },
  computed: {
    pageNumber () {
      const pageNumber = Math.ceil(this.total / this.pageSize__)
      return pageNumber <= 0 ? 1 : pageNumber
    },
    /**
     * 两边最大占用
     */
    maxSideOccupy () { return this.sizeSide * 2 },
    /**
     * 中间最大占用
     */
    maxCenterOccupy () { return this.sizeCenter * 2 + 1 },
    visibleLeft () {
      return this.pageNumber > this.sizeSide ? this.sizeSide : this.pageNumber
    },
    visibleRight () {
      const difference = this.pageNumber - this.sizeSide
      if (difference <= 0) { return [] }
      const size = difference > this.sizeSide ? this.sizeSide : difference
      const result = []
      for (let index = 0; index < size; index++) {
        result.push(this.pageNumber - index)
      }
      return result.sort((a, b) => a - b)
    },
    maxCenter () {
      const difference = this.pageNumber - this.maxSideOccupy
      return difference > 0 ? this.pageNumber - this.sizeSide : 0
    },
    minCenter () {
      const difference = this.pageNumber - this.maxSideOccupy
      return difference > 0 ? 1 + this.sizeSide : 0
    },
    start () {
      // 中间实际最大个数  小于 预期最大个数  => start = minCenter
      if (this.maxCenter - this.minCenter < this.maxCenterOccupy) { return this.minCenter }
      if (this.currentPage - this.minCenter <= this.sizeCenter) { return this.minCenter }

      const difference = this.maxCenter - this.currentPage
      if (difference < this.sizeCenter) { return this.maxCenter - this.sizeCenter * 2 }

      return this.currentPage - this.sizeCenter
    },
    end () {
      if (this.maxCenter - this.minCenter < this.maxCenterOccupy) { return this.maxCenter }

      if (this.maxCenter - this.currentPage <= this.sizeCenter) { return this.maxCenter }
      const difference = this.currentPage - this.minCenter
      if (difference < this.sizeCenter) { return this.minCenter + this.sizeCenter * 2 }

      return this.currentPage + this.sizeCenter
    },
    visibleCenter () {
      if (this.maxCenter === 0 || this.minCenter === 0) { return [] }
      if (this.start === 0 || this.end === 0) { return [] }
      const result = []
      for (let index = this.start; index <= this.end; index++) {
        result.push(index)
      }
      return result
    },
    info () {
      return { pageNum: this.currentPage, pageSize: this.pageSize__ }
    },
    rules () {
      return [
        { required: true },
        { type: 'number', min: 1, max: this.pageNumber }
      ]
    }
  },
  watch: {
    pageNumber (newValue, oldValue) {
      this.currentPage = 1
      console.debug(`me-paging-----watch-------pageNumber----------new=${newValue}, old=${oldValue}, time=`, new Date().getTime())
      this.$emit('change-page', { ...this.info })
    },
    pageSize (value) { this.pageSize__ = value }
  },
  methods: {
    itemClass (value) {
      return [
        'me-row me-center',
        {
          'paging-border': this.border,
          'is-selected': value && this.currentPage === value
        }
      ]
    },
    handlerPageSize ({ value }) {
      this.info.pageSize__ = value
      this.$emit('change-page', { ...this.info })
      this.$emit('change-page-size', { ...this.info })
      this.$emit('update:page-size', value)
    },
    setCurrentPage (value) {
      if (Type.isNumber(value)) {
        if (value > this.pageNumber) {
          this.currentPage = this.pageNumber
        } else if (value < 1) {
          this.currentPage = 1
        } else {
          this.currentPage = value
        }
        this.$emit('change-page', { ...this.info })
      }
    }
  }
}
</script>
