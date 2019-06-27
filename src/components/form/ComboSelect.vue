<template>
  <div :class="classes">
    <me-input
      :disabled="disabled"
      :icon-suffix="iconSuffix"
      :placeholder="placeholder"
      :readonly="readonly"
      @blur-input="blurInput"
      @click-input="clickInput"
      @click-suffix="clickSuffix"
      ref="input"
      v-model="label__"
    />
    <div :style="{'z-index':status?10000:0}" class="me-column me-border combo-body" v-show="status">
      <div :class="classItem(item.label)" :key="item.value" @click="clickItem(item,index)" v-for="(item,index) in data">
        <me-checkbox v-if="checkbox"/>
        <span class="combo-item-inner">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeComboSelect',
  props: {
    data: { type: Array, default() { return [] } },
    value: { type: [String, Object] }
  },
  data() {
    return {
      status: false,
      label__: '',
      value__: '',
      index__: 0
    }
  },
  created() {
    this.initValue()
  },
  computed: {
    classes() {
      return [
        'me-combo'
      ]
    },
    iconSuffix() {
      return this.status ? this.$config.icon.angle_down_fill : this.$config.icon.angle_up_fill
    }
  },
  watch: {
    status(value) {
      if (value) {
        console.log(value)
        // this.$refs.input.focus()
      }
    }
  },
  methods: {
    findItem(target) {
      return this.data.find(({ value, label }) => value === target.value || label === target.label)
    },
    initValue() {
      if (this.$tools.isEmpty(this.value)) { return }
      const inputValue = this.$type.isString(this.value) ? { value: this.value, label: this.value } : this.value
      const result = this.findItem(inputValue)
      if (result) {
        this.value__ = result.value || ''
        this.label__ = result.label || ''
      }
    },
    classItem(label) {
      return [
        'me-row combo-item',
        { 'combo-item-selected': this.label__ === label }
      ]
    },
    clickSuffix() {
      this.status = !this.status
    },
    clickInput() {
      this.readonly && this.clickSuffix()
    },
    clickItem({ label, value }, index) {
      this.status = false
      this.label__ = label, this.value__ = value, this.index__ = index
    }
  }
}
</script>
