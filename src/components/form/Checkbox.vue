<template>
  <label class="me-checkbox">
    <input @change="$emit('change')" @click.stop="click(!currentValue)" ref="checkbox" type="checkbox" v-model="currentValue">
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
    halfChecked: Boolean,
    value: Boolean
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue) {
      this.$emit('input', newValue)
    },
    halfChecked(newValue) {
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
