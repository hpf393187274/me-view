<template>
  <div class="me-column table-header">
    <div class="me-row me-flex table-row">
      <div class="me-row me-center table-column" v-if="checkbox">
        <me-checkbox :checkedHalf="checkedHalf" @click="handlerCheckbox" v-model="checked__"/>
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
  }
}
</script>
