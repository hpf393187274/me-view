<template>
  <div :class="clesses" @click="handlerRow">
    <div class="me-row me-center table-column" v-if="checkbox">
      <me-checkbox @click.stop="handlerCheckbox" v-model="checked__"/>
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
    data: { type: Object, default: () => ({}) },
    selectedChecked: Boolean,
    checkedSelected: Boolean
  },
  computed: {
    clesses() {
      return [
        'me-row me-flex table-row',
        { 'row-selected': this.selectedChecked && this.checked__ }
      ]
    }
  },
  methods: {
    handlerCheckbox(value) {
      this.$emit('click-checkbox', value, this.data, this.index)
    },
    handlerRow() {
      if (this.selectedChecked) {
        this.handlerCheckbox(this.checked__ = !this.checked__)
      }
      this.$emit('click-row', this.data, this.index)
    },
    handlerColumn({ field }, index) {
      this.$emit('click-column', this.data[field], index, this.data, this.index)
    }
  }
}
</script>
