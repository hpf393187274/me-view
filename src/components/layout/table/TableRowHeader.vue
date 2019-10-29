<template>
  <div class="table-header">
    <div :style="stylesRow" class="me-row table-row">
      <me-table-cell center v-if="checkbox" width="40px">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click-checkbox="onClickCheckbox" v-model="checked__" />
      </me-table-cell>
      <me-table-cell :class="classColumn" :key="item.label" :render="null" v-bind="item" v-for="item in columns">
        <span class="table-column-inner">{{item.label}}</span>
      </me-table-cell>
    </div>
  </div>
</template>
<script>
import RowMixin from './row.mixin'
export default {
  name: 'MeTableRowHeader',
  mixins: [RowMixin],
  props: {
    checkedHalf: Boolean,
    dataLength: Number
  },
  data() {
    return {
      hasScrollbar: false,
      scrollbarWidth: 0
    }
  },
  watch: {
    checked__(value) { this.$emit('update:checked', value) },
    dataLength() {
      this.$nextTick(this.initScrollbar)
    }
  },
  computed: {
    stylesRow() {
      if (this.hasScrollbar) {
        return { width: `calc( 100% - ${this.scrollbarWidth}px)` }
      }
      return {}
    }
  },
  created() {
    this.$nextTick(this.initScrollbar)
  },
  methods: {
    onClickCheckbox(value) {
      this.$emit('click-checkbox', value)
    },
    initScrollbar() {
      this.hasScrollbar = this.existScrollbar()
      this.hasScrollbar && (this.scrollbarWidth = this.getScrollbarWidth())
    },
    existScrollbar() {
      const parent = this.$parent ? this.$parent : this.$root
      const target = parent.$refs.body
      return target.scrollHeight > (target.innerHeight || target.clientHeight);
    },
    getScrollbarWidth() {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    }
  }
}
</script>
