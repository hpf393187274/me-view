<template>
  <div :class="classes" @click.self="onHandleClick">
    <me-checkbox v-if="checkbox" v-model="checked__" />
    <span class="combo-option-inner">
      <slot>{{data[fieldLabel]}}</slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'MeComboOption',
  props: {
    checked: Boolean,
    index: Number,
    checkbox: Boolean,
    highlight: Boolean,
    value: String,
    label: String,
    data: { type: Object, default () { return {} } },
    fieldLabel: { type: String, default: 'label' }
  },
  data () {
    return {
      checked__: this.checked
    }
  },
  created () {
    this.__data = this.data ? this.data : { value: this.value, label: this.label }
  },
  watch: {
    checked (value) {
      this.checked__ = value
    }
  },
  computed: {
    classes () {
      return [
        'me-row combo-option',
        { 'is-selected': this.highlight && this.checked__ }
      ]
    }
  },
  methods: {
    onHandleClick () {
      if (this.disabled === true) { return }
      this.checked__ = this.checked__ !== true
      this.$emit('click-option', this.data, this.index)
    }
  }
}
</script>
