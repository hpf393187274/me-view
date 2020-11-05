<template>
  <me-combo ref="combo" v-bind="$props" v-on="$listeners">
    <me-list :data="data" :value="value" :checkbox="checkbox" @click="handlerClick"></me-list>
  </me-combo>
</template>

<script>
import ComboProps from '../combo/combo.props'
export default {
  mixins: [ ComboProps ],
  name: 'ComboSelect',
  methods: {
    handlerClick ({ data, index }) {
      this.$refs.combo.$emit('me-combo--select', data, index)
    }
  }
}
</script>
