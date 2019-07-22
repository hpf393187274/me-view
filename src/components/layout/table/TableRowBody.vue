<template>
  <div :class="clesses" @click="handlerRow">
    <div class="me-row me-center table-column" v-if="checkbox">
      <me-checkbox @click="handlerChecked(!checked__)" v-model="checked__" />
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
    data: { type: Object, default: () => ({}) }
  },
  computed: {
    clesses() {
      return [
        'me-row me-flex table-row',
        { 'row-selected': this.checkedDirectly && this.checked__ }
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
    handlerChecked(value) {
      this.$emit('click-checkbox', value, this.data, this.index, this)
    },
    handlerRow() {
      if (this.checkedDirectly) {
        this.checked__ = !this.checked__
        this.$emit('click-checkbox', this.checked__, this.data, this.index, this)
      }
      this.$emit('click-row', this.data, this.index)
    },
    handlerColumn({ field }, index) {
      this.$emit('click-column', this.data[field], index, this.data, this.index)
    }
  }
}
</script>
