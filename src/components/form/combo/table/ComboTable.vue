<template>
  <me-combo ref="combo" v-bind="$props">
    <me-table :border="border" :columns="columns" :data="data" :highlight="highlight" :multiple="multiple" @click-row="onClickRow">
      <slot />
    </me-table>
  </me-combo>
</template>

<script>
import ComboMixin from '../combo.mixin'
import Combo from '../Combo'
export default {
  components: { [Combo.name]: Combo },
  mixins: [ComboMixin],
  name: 'MeComboTable',
  props: {
    columns: { type: Array, default: () => [] },
  },
  watch: {
    value(value) { this.value__ = value }
  },
  created() {
    this.value__ = this.value
  },
  methods: {
    onClickRow(row, index) {
      this.$refs.combo.onClickOption(row, index)
      this.$emit('change', this.multiple ? [...this.value__] : this.value__)
    }
  }
}
</script>
