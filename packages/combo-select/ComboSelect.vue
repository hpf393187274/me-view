<template>
  <me-combo ref="combo" v-bind="$props" v-model="value__">
    <me-list v-bind="$props" v-model="value__" @click="handlerClick"></me-list>
  </me-combo>
</template>

<script>
import ComboMixin from '../combo/combo.mixin'
import Combo from '../combo/index'
export default {
  components: { [Combo.name]: Combo },
  mixins: [ ComboMixin ],
  name: 'MeComboSelect',
  props: {
    columns: { type: Array, default: () => [] }
  },
  watch: {
    value (value) { this.value__ = value }
  },
  created () {
    this.value__ = this.value
  },
  methods: {
    handlerClick (row, index) {
      this.$emit('me-combo--select', row, index)
    }
  }
}
</script>
