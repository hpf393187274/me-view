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
    </me-table>
  </me-combo>
</template>

<script>
import ComboCommon from '../combo/combo.common'
import ComboExtend from '../combo/combo.extend'
import Combo from '../combo'
export default {
  components: { [Combo.name]: Combo },
  mixins: [ ComboCommon, ComboExtend ],
  name: 'MeComboTable',
  props: {
    columns: { type: Array, default: () => [] }
  }
}
</script>
