<template>
  <div :class="classes" @click="handleClick">
    <me-checkbox v-if="checkbox" v-model="checked__" />
    <span class="list-item-inner">
      <slot>{{data[fieldLabel]}}</slot>
    </span>
  </div>
</template>
<script>
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'MeListItem',
  mixins: [ emitter ],
  props: {
    checked: Boolean,
    index: Number,
    checkbox: Boolean,
    disabled: Boolean,
    highlight: Boolean,
    value: String,
    label: String,
    data: { type: Object, default () { return {} } },
    fieldValue: { type: String, default: 'value' },
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
        'me-row list-item',
        { 'is-selected': this.highlight && this.checked__ }
      ]
    }
  },
  methods: {
    handleClick () {
      if (this.disabled === true) { return }
      this.checked__ = this.checked__ !== true
      this.dispatchParent('click', { data: this.data, index: this.index })
    }
  }
}
</script>
