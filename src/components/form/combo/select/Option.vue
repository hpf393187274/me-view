<template>
  <div :class="classes" @click="onHandleClick">
    <me-checkbox v-if="multiple && checkbox" v-model="checked__" />
    <slot :data="data">
      <span class="combo-option-inner">{{data[fieldLabel]}}</span>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'MeComboOption',
  props: {
    checked: Boolean,
    index: Number,
    multiple: Boolean,
    checkbox: Boolean,
    highlight: Boolean,
    data: { type: Object, default() { return {} } },
    fieldLabel: { type: String, default: 'label' }
  },
  data() {
    return {
      checked__: this.checked
    }
  },
  watch: {
    checked(value) {
      this.checked__ = value
    }
  },
  computed: {
    classes() {
      return [
        'me-row combo-option',
        { 'is-selected': this.highlight && this.checked__ }
      ]
    },
  },
  methods: {
    onHandleClick() {
      if (this.disabled === true) { return }
      this.checked__ = this.checked__ === true ? false : true
      this.$emit('click-option', this.data, this.index)
    }
  }
}
</script>
