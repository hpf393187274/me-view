<template>
  <div class="me-row me-center me-border me-paging">
    <span :class="itemClass()" @click="--currentPage" class="me-row me-center" title="上一页">
      <template v-if="boolean(prevText)">{{prevText}}</template>
      <me-icon v-else>icon-fenye-shangyiye</me-icon>
    </span>
    <div class="me-row me-center pagination">
      <span :class="itemClass(1)" @click="currentPage = 1" class="me-row me-center">1</span>
      <template v-if="pageNumber > 2">
        <span :title="`向前${size}页`" @click="setCurrentPage(currentPage - size)" class="me-row me-center" v-if="preMore">
          <me-icon>icon-more</me-icon>
        </span>
        <template v-for="value in visiblePageNumber">
          <span :class="itemClass(value)" :key="value" @click="currentPage = value" class="me-row me-center">{{value}}</span>
        </template>
        <span :title="`向后${size}页`" @click="setCurrentPage(currentPage + size)" class="me-row me-center" v-if="nextMore">
          <me-icon>icon-more</me-icon>
        </span>
      </template>
      <span :class="itemClass(pageNumber)" @click="currentPage = pageNumber" class="me-row me-center" v-if="pageNumber > 1">{{pageNumber}}</span>
    </div>
    <span :class="itemClass()" @click="++currentPage" class="me-row me-center" title="下一页">
      <template v-if="boolean(nextText)">{{nextText}}</template>
      <me-icon v-else>icon-fenye-xiayiye</me-icon>
    </span>
    <span class="me-row me-center">共 {{total}} 条</span>
    <me-number :value="`${currentPage}`" @change="setCurrentPage"/>
  </div>
</template>

<script>
import { type } from '@assets/script/common'
export default {
  name: 'MePaging',
  props: {
    value: { type: Number, default: 1 },
    total: { type: Number, default: 0, validator: value => type.isNumber(value) },
    pageSize: { type: Number, default: 10, validator: value => type.isNumber(value) && value !== 0 },
    pageSizes: { type: Number, default: 10 },
    prevText: { type: String, default: '' },
    nextText: { type: String, default: '' }
  },
  data() {
    return {
      size: 5,
      currentPage: this.value
    }
  },
  computed: {
    preMore() {
      return this.visiblePageNumber[0] > 2
    },
    nextMore() {
      return this.visiblePageNumber[this.visiblePageNumber.length - 1] < this.pageNumber - 1
    },
    pageNumber() {
      return Math.ceil(this.total / this.pageSize)
    },
    visiblePageNumber() {
      let [start, end] = [2, this.pageNumber - 1]

      const difference = this.currentPage - this.size
      difference > start && (start = difference)


      const sum = this.currentPage + this.size
      sum < end && (end = sum)

      const result = []
      for (let index = start; index <= end; index++) {
        result.push(index)
      }
      return result
    }
  },
  watch: {
    currentPage(value) {
      this.$emit('change', value)
    },
    pageSize(value) {
      this.$emit('change-page-size', value)
    }
  },
  methods: {
    itemClass(value) {
      return ['paging-border', { 'selected': value && this.currentPage === value }]
    },
    setCurrentPage(value) {
      value = Number(value)
      if (value < 1 || value > this.pageNumber) { return }
      this.currentPage = value
    }
  }
}
</script>
