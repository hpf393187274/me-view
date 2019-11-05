<template>
  <me-combo-select
    :clearable="clearable"
    :data="data"
    :disabled="disabled"
    :field-label="fieldLabel"
    :field-value="fieldValue"
    :height="height"
    :highlight="highlight"
    :multiple="multiple"
    :placeholder="placeholder"
    :readonly="readonly"
    ref="combo"
    v-model="value__"
  >
    <template #options>
      <me-tree
        :border="border"
        :data="data"
        :expanded-level="expandedLevel"
        :expanded-node-click="false"
        :highlight="highlight"
        :node-key="fieldValue"
        @click-node="onClickNode"
        ref="tree"
      >
        <template #node-label="{data}">
          <slot :data="data" name="node-label" />
        </template>
      </me-tree>
    </template>
  </me-combo-select>
</template>

<script>
import ComboMixin from '../combo.mixin'
export default {
  mixins: [ComboMixin],
  name: 'MeComboTree',
  props: {
    expandedLevel: { type: Number },
    placeholder:String
  },
  watch: {
    value(value) { this.value__ = value }
  },
  created() {
    this.value__ = this.value
  },
  methods: {
    onClickNode(row, index) {
      this.$refs.combo.onClickOption(row, index)
      this.$emit('change', this.multiple ? [...this.value__] : this.value__)
    }
  }
}
</script>
