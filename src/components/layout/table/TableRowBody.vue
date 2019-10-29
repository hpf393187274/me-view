<template>
  <div :class="clesses" @click="handlerRow">
    <slot :data="data">
      <me-table-cell center v-if="checkbox" width="40px">
        <me-checkbox v-model="checked__" />
      </me-table-cell>
      <me-table-cell :data="data" :key="item.field" v-bind="item" v-for="item in columns" />
    </slot>
  </div>
</template>
<script>
import RowMixin from './row.mixin'
let idSeed = 1
export default {
  name: 'MeTableRowBody',
  mixins: [RowMixin],
  props: {
    indexRow: Number,
    data: { type: Object, default: () => ({}) },
    renderMethod: Function,
    highlight: Boolean,
    columns: Array
  },
  data() {
    return {
      id__: null
    }
  },
  created() {
    this.id__ = `me-table-row_${idSeed++}`
  },
  computed: {
    clesses() {
      return [
        'me-row me-flex table-row',
        { 'is-selected': this.highlight && this.checked__ }
      ]
    }
  },
  methods: {
    setChecked(value) {
      this.checked__ = value
    },
    hasScrollbar() {
      const body = this.$refs.body
      return body.scrollHeight > (body.innerHeight || body.clientHeight);
    },
    handlerRow() {
      this.checked__ = this.checked__ === true ? false : true
      this.$emit('click-row', this.checked__, this.data, this.indexRow, this)
    },
    handlerColumn({ field }, index) {
      this.$emit('click-column', this.data[field], index, this.data, this.indexRow)
    }
  }
}
</script>
