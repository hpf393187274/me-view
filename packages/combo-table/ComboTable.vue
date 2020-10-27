<template>
  <me-combo ref="combo" v-bind="$props" v-on="$listeners">
    <me-table
        :border="border"
        :columns="columns"
        :data="data"
        :highlight="highlight"
        :multiple="multiple"
        @click-row="handlerClick">
        <slot />
        <slot name="header" slot="header" />
        <slot name="footer" slot="footer" />
    </me-table>
  </me-combo>
</template>

<script>
import ComboProps from '../combo/combo.props'
export default {
  mixins: [ ComboProps ],
  name: 'ComboTable',
  props: {
    columns: { type: Array, default: () => [] }
  },
  methods: {
    handlerClick ({ data, index }) {
      this.$refs.combo.$emit('me-combo--select', data, index)
    }
  }
}
</script>
