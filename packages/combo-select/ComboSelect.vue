<template>
  <me-combo ref="combo" v-bind="$props" v-model="value__">
    <me-list v-bind="$props" v-model="value__" @click="handlerClick"></me-list>
  </me-combo>
</template>

<script>
import ComboCommon from '../combo/combo.common'
import ComboExtend from '../combo/combo.extend'
import Combo from '../combo/index'
export default {
  components: { [Combo.name]: Combo },
  mixins: [ ComboCommon, ComboExtend ],
  name: 'MeComboSelect',
  props: {
    columns: { type: Array, default: () => [] }
  }
}
</script>
