<template>
  <div class="me-column table-header">
    <div :style="stylesRow" class="me-row table-row">
      <div class="me-row me-center table-column" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" :disabled="multiple === false" @click-checkbox="onClickCheckbox" v-model="checked__" />
      </div>
      <div :class="classColumn" :key="item.label" v-for="item in columns">
        <span class="table-column-inner">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import RowMixin from './row.mixin'
export default {
  name: 'MeTableRowHeader',
  mixins: [RowMixin],
  props: {
    checkedHalf: Boolean
  },
  data() {
    return {
      hasScrollbar: false,
      scrollbarWidth: 0
    }
  },
  watch: {
    checked__(value) { this.$emit('update:checked', value) }
  },
  computed: {
    stylesRow() {
      if (this.hasScrollbar) {
        return { width: `calc( 100% - ${this.scrollbarWidth}px)` }
      }
      return {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.hasScrollbar = this.existScrollbar()
      this.hasScrollbar && (this.scrollbarWidth = this.getScrollbarWidth())
    })
  },
  methods: {
    onClickCheckbox(value) {
      this.$emit('click-checkbox', value)
    },
    init() {
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
