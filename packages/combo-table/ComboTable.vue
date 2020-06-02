<template>
  <me-combo v-bind="$props" v-model="value__">
    <me-table :border="border" :columns="columns" :data="data" :highlight="highlight" :multiple="multiple" @click-row="handlerClick">
      <slot />
    </me-table>
  </me-combo>
</template>

<script>
import ComboMixin from '../combo/combo.mixin'
import Combo from '../combo'
export default {
  components: { [Combo.name]: Combo },
  mixins: [ ComboMixin ],
  name: 'MeComboTable',
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
    handlerClick ({ data, index }) {
      this.$emit('me-combo--select', data, index)
    }
  }
}
</script>
