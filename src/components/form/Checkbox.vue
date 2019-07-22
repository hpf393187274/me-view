<template>
  <label class="me-checkbox">
    <input
      :disabled="disabled"
      @change="$emit('change')"
      @click.stop="click(!currentValue)"
      class="checkbox-inner"
      ref="checkbox"
      type="checkbox"
      v-model="currentValue"
    />
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'MeCheckbox',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    checkedHalf: Boolean,
    value: Boolean
  },
  computed: {
    styles() {
      return {}
    }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue) {
      this.$emit('input', newValue)
    },
    checkedHalf(newValue) {
      this.$refs.checkbox.indeterminate = newValue
    }
  },
  methods: {
    click(value) {
      this.currentValue = value
      this.$emit('click', value)
    }
  }
}
</script>
