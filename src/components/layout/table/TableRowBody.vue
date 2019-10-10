<template>
  <div :class="clesses" @click="handlerRow">
    <div class="me-row me-center table-column" v-if="checkbox">
      <me-checkbox v-model="checked__" />
    </div>
    <div :class="classColumn" :key="item.label" @click="handlerColumn(item,index)" v-for="(item, index) in columns">
      <span class="table-column-inner">{{data[item.field]}}</span>
    </div>
  </div>
</template>
<script>
import RowMixin from './row.mixin'
export default {
  name: 'MeTableRowBody',
  mixins: [RowMixin],
  props: {
    index: Number,
    data: { type: Object, default: () => ({}) },
    highlight: Boolean
  },
  computed: {
    clesses() {
      return [
        'me-row me-flex table-row',
        { 'row-selected': this.highlight && this.checked__ }
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
      this.$emit('click-row', this.checked__, this.data, this.index, this)
    },
    handlerColumn({ field }, index) {
      this.$emit('click-column', this.data[field], index, this.data, this.index)
    }
  }
}
</script>
