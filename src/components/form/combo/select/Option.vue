<template>
  <div :class="classes" @click="handleClick">
    <me-checkbox v-if="multiple && checkbox" v-model="selected__" />
    <slot :data="data">
      <span class="combo-option-inner">{{data[fieldLabel]}}</span>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'MeComboOption',
  props: {
    data: { type: Object, default() { return {} } },
    fieldLabel: { type: String, default: 'label' }
  },
  data() {
    return {
      selected__: this.selected
    }
  },
  watch: {
    selected(value) {
      this.selected__ = value
    }
  },
  computed: {
    classes() {
      return [
        'me-row combo-option',
        { 'combo-option-selected': this.selected__ }
      ]
    },
  },
  methods: {
    handleClick() {
      if (this.disabled === false) {
        this.multiple && (this.selected__ = !this.selected__)
        this.$emit('click', this.data, this.index)
      }
    }
  }
}
</script>
