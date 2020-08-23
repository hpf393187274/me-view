<template>
  <me-combo ref="combo" v-bind="$props" v-model="value__">
    <me-tree
      :border="border"
      :data="data"
      :expanded-level="expandedLevel"
      :click-expanded="false"
      :highlight="highlight"
      :field-value="fieldValue"
      :field-label="fieldLabel"
      @click="handlerClick">
      <slot :data="data" name="node-label" slot="node-label" />
    </me-tree>
  </me-combo>
</template>

<script>
import ComboCommon from '../combo/combo.common'
import ComboExtend from '../combo/combo.extend'
import Combo from '../combo'
export default {
  components: { [Combo.name]: Combo },
  mixins: [ ComboCommon, ComboExtend ],
  name: 'MeComboTree',
  props: {
    expandedLevel: Number
  }
}
</script>
