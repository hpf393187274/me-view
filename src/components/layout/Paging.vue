<template>
  <div class="me-row me-center me-border me-paging">
    <me-link :border="border" :disabled="currentPage <= 1" @click="--currentPage" class="item">
      <template v-if="boolean(prevText)">{{prevText}}</template>
      <me-icon v-else>icon-fenye-shangyiye</me-icon>
    </me-link>
    <div class="me-row me-center pagination">
      <me-link :border="border" :class="itemClass(1)" @click="currentPage = 1">1</me-link>
      <template v-if="pageNumber > 2">
        <me-link :border="border" @click="setCurrentPage(currentPage - size)" class="item" v-if="preMore">
          <me-icon>icon-more</me-icon>
        </me-link>
        <me-link
          :border="border"
          :class="itemClass(value)"
          :key="value"
          @click="currentPage = value"
          v-for="value in visiblePageNumber"
        >{{value}}</me-link>
        <me-link :border="border" @click="setCurrentPage(currentPage + size)" class="item" v-if="nextMore">
          <me-icon>icon-more</me-icon>
        </me-link>
      </template>
      <me-link
        :border="border"
        :class="itemClass(pageNumber)"
        @click="currentPage = pageNumber"
        v-if="pageNumber > 1"
      >{{pageNumber}}</me-link>
    </div>
    <me-link :border="border" :disabled="currentPage >= pageNumber" @click="++currentPage" class="item next">
      <template v-if="boolean(nextText)">{{nextText}}</template>
      <me-icon v-else>icon-fenye-xiayiye</me-icon>
    </me-link>
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
    prevText: { type: String, default: "" },
    nextText: { type: String, default: "" }
  },
  data() {
    return {
      size: 3,
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
      return ['item', { 'selected': this.currentPage === value }]
    },
    setCurrentPage(value) {
      if (value < 1 || value > this.pageNumber) { return }
      this.currentPage = value
    }
  }
}
</script>
