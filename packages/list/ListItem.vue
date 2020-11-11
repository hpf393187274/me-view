<template>
  <div :class="classes" @click="handleClick">
    <me-checkbox v-if="checkbox" v-model="valueInner" />
    <span class="list-item-inner">
      <slot :data="data">{{data[fieldLabel]}}</slot>
    </span>
  </div>
</template>
<script>
import Selector from 'me-view/src/mixins/selector-dispatch'
export default {
  name: 'ListItem',
  mixins: [ Selector ],
  props: {
    index: Number,
    checkbox: Boolean,
    disabled: Boolean,
    highlight: Boolean,
    multiple: Boolean,
    data: { type: Object, default () { return {} } },
    fieldValue: { type: String, default: 'value' },
    fieldLabel: { type: String, default: 'label' }
  },
  computed: {
    uniqueValue () {
      return Reflect.get(this.data, this.fieldValue) || this.index
    },
    containerName () { return 'List' },
    classes () {
      return [
        'me-row list-item',
        { 'is-selected': this.selected }
      ]
    },
    selected () {
      if (this.multiple === true) { return false }
      return this.highlight === true && this.valueInner
    }
  },
  methods: {
    handleClick () {
      if (this.disabled === true) { return }
      this.valueInner = this.valueInner !== true
      this.handleSelector && this.handleSelector(this.valueInner)
      this.dispatchParent('click', { data: this.data, index: this.index })
    }
  }
}
</script>
