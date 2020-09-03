<template>
  <me-combo ref="combo" v-bind="$props" v-model="value__">
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
import ComboCommon from '../combo/combo.common'
import ComboExtend from '../combo/combo.extend'
export default {
  mixins: [ ComboCommon, ComboExtend ],
  name: 'ComboTable',
  props: {
    columns: { type: Array, default: () => [] }
  }
}
</script>
